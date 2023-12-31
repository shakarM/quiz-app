import { useEffect } from "react";

export default function Timer({ dispatch, setRemaining }) {
  const sec = Math.floor(setRemaining % 60);
  const min = Math.floor(setRemaining / 60);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tik" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="time">
      {min}:{sec}
    </div>
  );
}
