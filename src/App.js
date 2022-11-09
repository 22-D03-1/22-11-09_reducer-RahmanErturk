import Recept from "./Recept";
import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { useReducer } from "react";

const initState = {
  checkedSteps: [],
  checked: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "checked":
      const stepIndex = state.checkedSteps.indexOf(action.payload);

      if (stepIndex >= 0) {
        state = {
          ...state,
          checkedSteps: state.checkedSteps.filter(
            (el) => el !== action.payload
          ),
        };
      } else {
        state = {
          ...state,
          checkedSteps: [...state.checkedSteps, action.payload],
          checked: action.checked,
        };
      }
      break;
    case "reset":
      state = {
        ...state,
        checkedSteps: [],
        checked: false,
      };
    default:
      console.warn("unknown action");
  }
  return state;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div className="App">
      <h1 className="title">Recipe App</h1>
      <Container>
        <Row>
          <img src={Recept[0].picture} alt={Recept[0].name} />
          <h2>{Recept[0].name}</h2>
          <h3>Steps</h3>
          {Recept[0].steps.map((step, index) => {
            return (
              <div className="steps" key={index}>
                <input
                  onChange={(e) => {
                    dispatch({
                      type: "checked",
                      payload: index,
                      checked: e.target.checked,
                    });
                  }}
                  checked={
                    state.checkedSteps.includes(index) ? state.checked : false
                  }
                  type="checkbox"
                  id={index}
                />

                <label
                  className={`step m-2 ${
                    state.checkedSteps.includes(index) ? "state-check" : ""
                  }`}
                  htmlFor={index}
                >
                  {step}
                </label>
              </div>
            );
          })}
        </Row>
        <Button
          className="mt-3 p-2 pt-1 pb-1"
          size="lg"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </Button>
      </Container>
    </div>
  );
}

export default App;
