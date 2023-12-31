export default function Start({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h1> Are you ready to test your knowledge? </h1>
      <h2> I have prepared {numOfQuestions} questions for you! </h2>
      <button className="start-btn" onClick={() => dispatch({ type: "start" })}>
        {" "}
        Let's start{" "}
      </button>
    </div>
  );
}
