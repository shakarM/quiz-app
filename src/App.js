import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Restart from "./Restart";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  setRemaining: null,
};
function reducer(state, action) {
  // eslint-disable-next-line default-case

  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        setRemaining: state.questions.length * 30,
      };
    case "finish":
      return { ...state, status: "finish" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        setRemaining: state.setRemaining - 1,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? (state.points += question.points)
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tik":
      return {
        ...state,
        setRemaining: state.setRemaining - 1,
        status: state.setRemaining > 0 ? "active" : "finish",
      };
    default:
      throw Error("Something is wrong");
  }
}

export default function App() {
  const url = "http://localhost:9000/questions";

  const [{ questions, status, index, answer, points, setRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const numOfQuestions = questions.length;

  useEffect(() => {
    async function fetching() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch {
        dispatch({ type: "dataFailed" });
      }
    }
    fetching();
  }, []);
  const maxPoint = questions.reduce((pre, cur) => {
    return pre + cur.points;
  }, 0);
  console.log(maxPoint);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              maxPoint={maxPoint}
              answer={answer}
              numOfQuestions={numOfQuestions}
              points={points}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} setRemaining={setRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish
            dispatch={dispatch}
            index={index}
            maxPoint={maxPoint}
            answer={answer}
            numOfQuestions={numOfQuestions}
            points={points}
          />
        )}
        {status === "finish" && (
          <Restart
            dispatch={dispatch}
            index={index}
            maxPoint={maxPoint}
            answer={answer}
            numOfQuestions={numOfQuestions}
            points={points}
          />
        )}
      </Main>
    </div>
  );
}
