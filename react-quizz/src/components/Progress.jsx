function Progress({ curIndex, answer, points }) {
  return (
    <div className="progress">
      <progress max={15} value={answer ? curIndex + 1 : curIndex}></progress>

      <div className="progress__infor">
        <p>
          Question <span>{curIndex + 1}</span> / 15
        </p>
        <p>
          <span>{points} / 280</span>
        </p>
      </div>
    </div>
  );
}

export default Progress;
