import Button from "./Button";
import Timer from "./Timer";

function Footer({
  handleNextBtn,
  answer,
  curIndex,
  questions,
  remainTime,
  dispatch,
}) {
  return (
    <footer className="footer">
      <Timer remainTime={remainTime} dispatch={dispatch} />

      {answer !== null && (
        <Button className="btn btn--next" onClick={handleNextBtn}>
          {curIndex === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      )}
    </footer>
  );
}

export default Footer;
