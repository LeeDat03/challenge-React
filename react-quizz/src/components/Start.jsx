import Button from "./Button";

function Start({ dispatch, questions }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{questions.length} question test your React mastery</h3>
      <Button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let&apos;s start
      </Button>
    </div>
  );
}

export default Start;
