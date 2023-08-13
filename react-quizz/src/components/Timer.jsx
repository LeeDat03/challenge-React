import { useEffect } from "react";

function Timer({ remainTime, dispatch }) {
  const min = String(Math.floor(remainTime / 60)).padStart(2, 0);
  const sec = String(remainTime % 60).padStart(2, 0);

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "time" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      <p>
        {min} : {sec}
      </p>
    </div>
  );
}

export default Timer;
