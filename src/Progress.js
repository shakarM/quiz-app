export default function Progress({
  index,
  numOfQuestions,
  maxPoint,
  answer,
  points,
}) {
  return (
    <header>
      <div className="progress-elements">
        <progress
          max={numOfQuestions}
          value={index + Number(answer !== null)}
        ></progress>
        <div className="points">
          <h3>
            {" "}
            Question: <span>{index + 1}</span> / {numOfQuestions}
          </h3>

          <h3>
            {" "}
            Points: <span>{points}</span> / {Number(maxPoint)}
          </h3>
        </div>
      </div>
    </header>
  );
}
