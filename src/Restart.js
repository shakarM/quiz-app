export default function Restart({ dispatch, index }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: "restart" });
      }}
      className="btn-n"
    >
      Restart
    </button>
  );
}
