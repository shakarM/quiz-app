export default function NextButton({
  dispatch,
  answer,
  index,
  numOfQuestions,
}) {
  if (index < numOfQuestions - 1) {
    return (
      <div>
        {answer !== null ? (
          <button
            className="btn-n next"
            onClick={() => {
              dispatch({ type: "nextQuestion" });
            }}
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }

  if (index === numOfQuestions - 1) {
    return (
      <div>
        {answer !== null ? (
          <button
            className="btn-n finish"
            onClick={() => {
              dispatch({ type: "finish" });
            }}
          >
            Finish
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
