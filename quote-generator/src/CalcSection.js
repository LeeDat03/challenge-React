import { useEffect, useState } from "react";
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
  const [operator, setOperator] = useState("");
  const [num1, setNum1] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [text, setText] = useState("");

  function handleNumPress(e) {
    if (isCompleted) {
      setInput((cur) => e.target.innerHTML);
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
    setIsCompleted(false);
  }

  function handleBack() {
    if (!isCompleted) setInput((cur) => Number(cur.toString().slice(0, -1)));
  }

  function handleFloat() {
    if (!isCompleted) setInput((cur) => cur + ".");
  }

  function handleCalc(e) {
    if (!input && !num1) return;

    setOperator(e.target.innerHTML);
    if (input) {
      setIsCompleted(false);
      setNum1(input);
      setInput("");
    }
  }

  function handleEqual() {
    if (!input) return;

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

    setOperator("");
  }

  useEffect(
    function () {
      if (!isCompleted)
        setText(`${num1 || ""} ${operator || ""} ${input || ""}`);
    },
    [input, operator, num1, isCompleted]
  );

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
