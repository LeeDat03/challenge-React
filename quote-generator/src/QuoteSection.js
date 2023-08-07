import { useEffect, useState } from "react";
import { Heading } from "./App";

///////////////////////////////////////////////////////////////////////////
// QUOTE
export default function QuoteSection() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getQuote() {
      setIsLoading(true);
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      console.log(data);

      setQuote(data.content);
      setAuthor(data.author);
      setIsLoading(false);
    }

    getQuote();
  }, []);

  function handleGetQuote() {
    async function getQuote() {
      try {
        setIsLoading(true);

        const response = await fetch("https://api.quotable.io/random");

        if (!response.ok) throw new Error("Error in response");
        const data = await response.json();

        console.log(data);

        setQuote(data.content);
        setAuthor(data.author);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }

    getQuote();
  }

  return (
    <div className="quote__container">
      <Heading>Quote of the days</Heading>
      {isLoading ? <Loading /> : <Blockquote quote={quote} author={author} />}
      <Controler handleGetQuote={handleGetQuote} />
    </div>
  );
}

function Loading() {
  return <div className="loading"></div>;
}

function Blockquote({ quote, author }) {
  return (
    <blockquote className="quote">
      <p>
        <span className="quote-mark">&quot;</span>
        {quote}
        <span className="quote-mark">&quot;</span>
      </p>
      <p className="author">
        <i>{author}</i>
      </p>
    </blockquote>
  );
}

function Controler({ handleGetQuote }) {
  return (
    <div className="controler">
      <div className="votes">
        <button className="btn btn-vote btn-vote-up">
          <ion-icon className="icon" name="caret-up-outline"></ion-icon>{" "}
          <span>5</span>
        </button>
        <button className="btn btn-vote btn-vote-down">
          <ion-icon className="icon" name="caret-down-outline"></ion-icon>{" "}
          <span>4</span>
        </button>
      </div>
      <button className="btn btn-new" onClick={handleGetQuote}>
        New quotes
      </button>
    </div>
  );
}
