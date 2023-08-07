import { useState } from "react";
import { Heading } from "./App";

//////////////////////////////////////////////////////////////////////////
// TO-DO LIST
const todoData = [
  {
    work: "an",
    level: "save",
    id: "1",
    done: false,
  },
  {
    work: "ngu",
    level: "normal",
    done: false,
    id: "2",
  },
  {
    work: "test",
    level: "importance",
    done: false,
    id: "3",
  },
];

export default function ToDoListSection() {
  const [data, setData] = useState(todoData);

  function handleAddList(item) {
    setData((data) => [...data, item]);
  }

  function handleDelete(curId) {
    setData((data) => data.filter((item) => item.id !== curId));
  }

  function handleDone(curId) {
    setData((data) =>
      data.map((item) =>
        item.id === curId ? { ...item, done: !item.done } : item
      )
    );
  }

  return (
    <div className="to-do__container">
      <Heading>To-do list</Heading>
      <ToDoForm onAddList={handleAddList} />
      <ToDoList data={data} onDeleteItem={handleDelete} onDone={handleDone} />
    </div>
  );
}

function ToDoForm({ onAddList }) {
  const [work, setWork] = useState("");
  const [level, setLevel] = useState("normal");

  function handleSubmit(e) {
    e.preventDefault();

    const itemList = {
      work,
      level,
      id: new Date().getTime(),
      done: false,
    };

    if (work) {
      onAddList(itemList);
      setWork("");
      setLevel("normal");
    }
  }

  return (
    <form className="to-do__input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add your list here"
        value={work}
        onChange={(e) => setWork(e.target.value)}
      />
      <select
        className="to-do__select"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="importance">Importance</option>
        <option value="normal">Normal</option>
        <option value="save">Save</option>
      </select>
      <button className="btn btn__add">
        <ion-icon className="icon-add" name="add-circle-outline"></ion-icon>
      </button>
    </form>
  );
}

function ToDoList({ data, onDeleteItem, onDone }) {
  return (
    <ul className="to-do__list">
      {data.map((item) => (
        <ToDo
          itemList={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onDone={onDone}
        />
      ))}
    </ul>
  );
}

function ToDo({ itemList, onDeleteItem, onDone }) {
  return (
    <li
      className={`to-do__item ${itemList.level === "importance" && "red"} ${
        itemList.level === "normal" && "yellow"
      } ${itemList.level === "save" && "green"}
      ${itemList.done ? "done" : ""}
      `}
    >
      <input type="checkbox" onChange={() => onDone(itemList.id)} />
      <span className="to-do__job">{itemList.work}</span>
      <span className="to-do__time">{itemList.level}</span>
      <button
        className="btn btn__delete"
        onClick={() => onDeleteItem(itemList.id)}
      >
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </li>
  );
}
