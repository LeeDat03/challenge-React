import { useState } from "react";
import { Heading } from "./App";
//////////////////////////////////////////////////////////////////////////
// CALCULATOR
export default function CalcSection() {
  return (
    <div className="calc__container">
      <Heading>Calculator</Heading>
      <Computer />
    </div>
  );
}

function Computer() {
  const [input, setInput] = useState("");
  const [num1, setNum1] = useState(0);
  const [operator, setOperator] = useState("");
  const [text, setText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  function handleNumPress(e) {
    if (isCompleted) {
      setInput((cur) => e.target.innerHTML);
      setText("");
      setIsCompleted(false);
    } else setInput((cur) => Number(cur + e.target.innerHTML));
  }

  function handleNegative() {
    if (input) setInput((cur) => -cur);
  }

  function handleReset() {
    setInput("");
    setOperator("");
    setNum1(0);
    setText("");
    setIsCompleted(false);
  }

  function handleBack() {
    if (!isCompleted) setInput((cur) => Number(cur.toString().slice(0, -1)));
  }

  function handleFloat() {
    if (!isCompleted) setInput((cur) => cur + ".");
  }

  function handleCalc(e) {
    if (input) {
      setIsCompleted(false);
      setNum1(input);
      setOperator(e.target.innerHTML);
      setText(`${input} ${e.target.innerHTML}`);
      setInput("");
    }
  }

  function handleEqual() {
    setText((cur) => `${cur} ${input}`);
    setIsCompleted(true);

    if (operator === "+") {
      setInput((cur) => num1 + cur);
    }

    if (operator === "-") {
      setInput((cur) => num1 - cur);
    }
    if (operator === "x") {
      setInput((cur) => num1 * cur);
    }
    if (operator === "÷") {
      setInput((cur) => num1 / cur);
    }
    if (operator === "%") {
      setInput((cur) => num1 % cur);
    }
  }

  return (
    <>
      <div className="calc__control">
        <div className="calc__input">
          <p className="calc__step">{text}</p>
          <input type="text" className="calc__type" value={input} disabled />
        </div>
        <ControlPress onClick={handleReset}>AC</ControlPress>
        <ControlPress onClick={handleNegative}>+/-</ControlPress>
        <ControlPress onClick={handleCalc}>%</ControlPress>
        <ControlPress onClick={handleCalc}>÷</ControlPress>
        <ControlPress onClick={handleNumPress}>7</ControlPress>
        <ControlPress onClick={handleNumPress}>8</ControlPress>
        <ControlPress onClick={handleNumPress}>9</ControlPress>
        <ControlPress onClick={handleCalc}>x</ControlPress>
        <ControlPress onClick={handleNumPress}>4</ControlPress>
        <ControlPress onClick={handleNumPress}>5</ControlPress>
        <ControlPress onClick={handleNumPress}>6</ControlPress>
        <ControlPress onClick={handleCalc}>-</ControlPress>
        <ControlPress onClick={handleNumPress}>1</ControlPress>
        <ControlPress onClick={handleNumPress}>2</ControlPress>
        <ControlPress onClick={handleNumPress}>3</ControlPress>
        <ControlPress onClick={handleCalc}>+</ControlPress>
        <ControlPress onClick={handleBack}>🔙</ControlPress>
        <ControlPress onClick={handleNumPress}>0</ControlPress>
        <ControlPress onClick={handleFloat}>.</ControlPress>
        <ControlPress onClick={handleEqual}>=</ControlPress>
      </div>
    </>
  );
}

function ControlPress({ children, onClick }) {
  return (
    <span className="calc__key" onClick={onClick}>
      {children}
    </span>
  );
}
