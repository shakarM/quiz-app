export default function Questions({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className="questions">
      <h1> {question.question}</h1>

      <div className="options">
        {question.options.map((element, index) => {
          return (
            <button
              className={`btn btn-option ${index === answer ? "answer" : ""}
              ${
                hasAnswered
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : "opt-btn"
              }
              `}
              disabled={hasAnswered}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
              key={element}
            >
              {element}
            </button>
          );
        })}
      </div>
    </div>
  );
}
