import { useEffect, useState } from "react";
import CalcSection from "./CalcSection";
import ToDoListSection from "./ToDoSection";
import QuoteSection from "./QuoteSection";

export default function App() {
  const [isSelected, setIsSelected] = useState("quote");

  return (
    <div className="app">
      <ListOfTab>
        <Tab name="quote" isSelected={isSelected} onIsSelected={setIsSelected}>
          Quote Generate
        </Tab>
        <Tab name="to-do" isSelected={isSelected} onIsSelected={setIsSelected}>
          To-do List
        </Tab>
        <Tab name="calc" isSelected={isSelected} onIsSelected={setIsSelected}>
          Calculator
        </Tab>
      </ListOfTab>

      {isSelected === "quote" && <QuoteSection />}
      {isSelected === "to-do" && <ToDoListSection />}
      {isSelected === "calc" && <CalcSection />}
    </div>
  );
}

export function Heading({ children }) {
  return <h1>{children}</h1>;
}

function ListOfTab({ children }) {
  return <div className="list__tab">{children}</div>;
}

function Tab({ children, onIsSelected, name, isSelected }) {
  return (
    <div
      className={`tab ${name === isSelected ? "tab-active" : ""}`}
      onClick={() => onIsSelected(name)}
    >
      {children}
    </div>
  );
}
