import Button from "./Button";

function Finish({ points, highscore, dispatch, questions }) {
  const totalPoints = questions.reduce((acc, ques) => acc + ques.points, 0);
  console.log(totalPoints);

  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <div className="finish">
      <p className="finish__head">
        You scored <span>{points}</span> out of {totalPoints} ({percentage}%)
      </p>
      <p>
        High score: <span>{highscore}</span> points
      </p>
      <Button
        className="btn btn-restart"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </Button>
    </div>
  );
}

export default Finish;
