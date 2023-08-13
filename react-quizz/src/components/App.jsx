import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Progress from "./Progress";
import Questions from "./Questions";
import Start from "./Start";
import Loading from "./Loading";
import Error from "./Error";
import Finish from "./Finish";
import Footer from "./Footer";

const initialState = {
  status: "loading",
  questions: [],
  curIndex: "",
  answer: null,
  points: 0,
  highscore: 0,
  remainTime: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataSucces":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "start",
        curIndex: 0,
        remainTime: state.questions.length * 30,
      };
    case "newAnswer": {
      const curQuestion = state.questions[state.curIndex];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curQuestion.correctOption
            ? state.points + curQuestion.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, curIndex: state.curIndex + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        remainTime: 0,
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "time":
      return {
        ...state,
        remainTime: state.remainTime - 1,
        status: state.remainTime === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { status, questions, curIndex, answer, points, highscore, remainTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function getQuestion() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        if (!res.ok) throw new Error(`Can't fetch to the server`);
        const data = await res.json();
        if (!data) throw new Error(`Can't get data`);
        dispatch({ type: "dataSucces", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }
    getQuestion();
  }, []);

  function handleNextBtn() {
    if (curIndex === questions.length - 1) {
      dispatch({ type: "finish" });
    }
    if (curIndex < questions.length - 1) {
      dispatch({ type: "nextQuestion" });
    }
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start dispatch={dispatch} questions={questions} />
        )}
        {status === "start" && (
          <>
            <Progress curIndex={curIndex} answer={answer} points={points} />
            <Questions
              curQuestion={questions.at(curIndex)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              handleNextBtn={handleNextBtn}
              curIndex={curIndex}
              questions={questions}
              answer={answer}
              remainTime={remainTime}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "finish" && (
          <Finish
            points={points}
            highscore={highscore}
            dispatch={dispatch}
            questions={questions}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
