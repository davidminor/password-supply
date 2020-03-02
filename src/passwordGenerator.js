import React, { useState, useEffect } from "react";
import * as markov from "markov-words";
import stats from "./stats";
import * as l33t from "l33t-substitution";

const generate = function(length, number) {
  length = parseInt(length);
  const lengthValid = !isNaN(length) && length >= 3;
  number = parseInt(number);
  const numberValid = !isNaN(number) && number > 0;
  if (lengthValid && numberValid) {
    return markov.generate(stats, length, number);
  }
  return [];
};

const Password = ({ text, capitalize, substitute }) => {
  if (capitalize) {
    text = text.charAt(0).toUpperCase() + text.substring(1);
  }
  if (substitute) {
    text = l33t(text, 2);
  }

  return <code>{text} </code>;
};

const PasswordList = ({ substitute, capitalize, words }) => (
  <div>
    <ul>
      {words.map(function(word) {
        return (
          <li className="password" key={word}>
            <Password
              text={word}
              substitute={substitute}
              capitalize={capitalize}
            />
          </li>
        );
      })}
    </ul>
  </div>
);

const PasswordGenerator = () => {
  const [length, setLength] = useState(14);
  const [number, setNumber] = useState(24);
  const [substitute, setSubstitute] = useState(false);
  const [capitalize, setCapitalize] = useState(false);
  const [words, setWords] = useState(generate(length, number));
  useEffect(() => {
    setWords(generate(length, number));
  }, [length, number]);
  return (
    <div>
      <div className="console">
        <label>
          Password length{" "}
          <input type="text" value={length} onChange={e => setLength(e.target.value)} />
        </label>{" "}
        <label>
          Number to generate{" "}
          <input type="text" value={number} onChange={e => setNumber(e.target.value)} />
        </label>{" "}
        <label>
          <input type="checkbox" checked={substitute} onChange={e => setSubstitute(e.target.checked)} />{" "}
          Numbers &amp; Symbols
        </label>{" "}
        <label>
          <input type="checkbox" checked={capitalize} onChange={e => setCapitalize(e.target.checked)} />{" "}
          Capitalize
        </label>
      </div>
      <div className="actions">
        <button className="clearfix" onClick={() => setWords(generate(length, number))}>
          Regenerate
        </button>
        <span className="clearfix" />
      </div>
      <PasswordList
        substitute={substitute}
        capitalize={capitalize}
        words={words}
      />
    </div>
  );
};

export default PasswordGenerator;
