import { useState } from "react";
import "./style.css";

const dataFriends = [
  {
    name: "Clark",
    imgSrc: "https://i.pravatar.cc/48?u=118836",
    increase: 0,
    decrease: 0,
    id: 1,
  },
  {
    name: "Sarah",
    imgSrc: "https://i.pravatar.cc/48?u=933372",
    increase: 0,
    decrease: 0,
    id: 2,
  },
  {
    name: "Anthony",
    imgSrc: "https://i.pravatar.cc/48?u=499476",
    increase: 0,
    decrease: 0,
    id: 3,
  },
];

export default function App() {
  return (
    <div className="container">
      <EatNSplit data={dataFriends} />
    </div>
  );
}

function EatNSplit({ data }) {
  const [curSelectBtn, setSelectBtn] = useState(null);
  const [friends, setFriends] = useState(data);
  const [yourBill, setYourBill] = useState("");
  const [payBill, setPayBill] = useState("increase");
  const [totalBill, setTotalBill] = useState("");

  function handleBill(cur, pay) {
    let money = payBill === "increase" ? totalBill - yourBill : yourBill;

    setFriends((friends) =>
      friends.map((f) =>
        f.id === cur ? { ...f, [pay]: f[pay] + money } : { ...f }
      )
    );
  }

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
  }

  return (
    <div className="box">
      <Friends
        data={friends}
        curSelectBtn={curSelectBtn}
        onSelectBtn={setSelectBtn}
      />
      <SplitBill
        curSelectBtn={curSelectBtn}
        data={friends}
        yourBill={yourBill}
        setYourBill={setYourBill}
        handleBill={handleBill}
        payBill={payBill}
        setPayBill={setPayBill}
        totalBill={totalBill}
        setTotalBill={setTotalBill}
      />
      <FormAddFriend handleAddFriend={handleAddFriend} data={friends} />
    </div>
  );
}

function Friends({ data, curSelectBtn, onSelectBtn }) {
  return (
    <>
      <ul className="friends">
        {data.map((el) => (
          <Friend
            name={el.name}
            imgSrc={el.imgSrc}
            increase={el.increase}
            decrease={el.decrease}
            id={el.id}
            key={el.id}
            curSelectBtn={curSelectBtn}
            onSelectBtn={onSelectBtn}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({
  name,
  imgSrc,
  id,
  increase,
  decrease,
  curSelectBtn,
  onSelectBtn,
}) {
  let isSelected = id === curSelectBtn;
  const total = increase - decrease;

  let status;
  let txtColor;

  if (total === 0) {
    status = `You and ${name} are even`;
  }
  if (total > 0) {
    status = `${name} owe you $${total}`;
    txtColor = {
      color: "#66a80f",
    };
  }
  if (total < 0) {
    status = `You owe ${name} $${Math.abs(total)}`;
    txtColor = {
      color: "#e03131",
    };
  }

  function handleToggle() {
    isSelected ? onSelectBtn(null) : onSelectBtn(id);
  }

  return (
    <>
      <li className={`friend ${isSelected ? "friend-active" : ""}`}>
        <div className="infor">
          <div className="img-box">
            <img src={imgSrc} alt="Img" />
          </div>

          <div className="infor-text">
            <h3 className="name">{name}</h3>
            <p className="status" style={txtColor}>
              {status}
            </p>
          </div>
        </div>

        <button className="btn" onClick={handleToggle}>
          {isSelected ? "close" : "select"}
        </button>
      </li>
    </>
  );
}

function FormAddFriend({ handleAddFriend, data }) {
  const [selectBtn, setSelectBtn] = useState(false);
  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState("https://i.pravatar.cc/");

  function handleSubmitAdd(e) {
    e.preventDefault();

    const friend = {
      name,
      imgSrc,
      id: data.length + 1,
      increase: 0,
      decrease: 0,
    };

    handleAddFriend(friend);

    setName("");
    setImgSrc("https://i.pravatar.cc/");
    setSelectBtn(false);
  }

  return (
    <>
      <div className={`form-add-box ${selectBtn ? "active" : ""}`}>
        <form className="form-add" onSubmit={(e) => handleSubmitAdd(e)}>
          <label>🧑‍🤝‍🧑 Friend name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>🖼️ Img URL</label>
          <input
            type="text"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
          ></input>
          <button className="btn btn-add-form">Add</button>
        </form>
      </div>
      <button className="btn btn-add" onClick={() => setSelectBtn(!selectBtn)}>
        {" "}
        {selectBtn ? "close" : "Add friend"}
      </button>
    </>
  );
}

function SplitBill({
  curSelectBtn,
  data,
  yourBill,
  setYourBill,
  handleBill,
  payBill,
  setPayBill,
  totalBill,
  setTotalBill,
}) {
  let friend = curSelectBtn ? data[curSelectBtn - 1] : "";

  let friendBill = Number(totalBill) - Number(yourBill);

  function handleSubmitBill(e) {
    e.preventDefault();

    handleBill(curSelectBtn, payBill);

    setTotalBill("");
    setYourBill("");
  }

  return (
    <div className={`bill ${curSelectBtn ? "active" : ""}`}>
      <h3 className="split-head">Split a bill with {friend?.name}</h3>

      <form className="form-split" onSubmit={handleSubmitBill}>
        <label>💰 Bill value </label>
        <input
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
        ></input>

        <label>🕴️ Your expense</label>
        <input
          type="number"
          value={yourBill}
          onChange={(e) => setYourBill(e.target.value)}
        ></input>

        <label>🧑‍🤝‍🧑 {friend.name}'s expense</label>
        <input type="text" disabled value={friendBill}></input>

        <label>🤑 Who was paying the bill</label>
        <select value={payBill} onChange={(e) => setPayBill(e.target.value)}>
          <option value="increase">You</option>
          <option value="decrease">{friend.name}</option>
        </select>
        <button className="btn btn-split">Split bill</button>
      </form>
    </div>
  );
}
