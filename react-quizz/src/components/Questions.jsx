import Button from "./Button";

function Questions({ curQuestion, answer, dispatch }) {
  const hasAnswer = answer !== null;

  return (
    <div className="question">
      <h4>{curQuestion.question}</h4>

      <div className="options">
        {curQuestion.options.map((opt, index) => (
          <Button
            className={`btn option ${
              answer === index ? "option--active" : ""
            } ${
              hasAnswer
                ? index === curQuestion.correctOption
                  ? "option--true"
                  : "option--wrong"
                : ""
            }`}
            key={index}
            disable={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
