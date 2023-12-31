export default function Finish({
  dispatch,
  index,
  maxPoint,
  answer,
  numOfQuestions,
  points,
}) {
  const percentPoint = (points / maxPoint) * 100;
  let emoji;
  if (points > 90 && points <= 100) emoji = "🤩";
  if (points > 60 && points <= 90) emoji = "😉";
  if (points > 30 && points <= 60) emoji = "😒";
  if (points <= 30) emoji = "💔";
  return (
    <div className="finish-msg">
      <p>
        {" "}
        You've finished the quiz with score of {points} out of {maxPoint}{" "}
        <span>{emoji}</span>
      </p>
      <h2>
        {" "}
        Overal score: <strong>{Math.ceil(percentPoint)}</strong>{" "}
      </h2>
    </div>
  );
}
