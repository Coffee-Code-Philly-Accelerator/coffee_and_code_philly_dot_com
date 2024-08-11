/* eslint-disable react/prop-types */
import React, { useState } from "react";

/**
 * Renders a quiz item component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.question - The question to be displayed.
 * @param {string} props.isFinalQuestion - A flag to indicate if the question is the final question.
 * @param {function} props.onNextQuestion - The callback function to be called when the next question button is clicked.
 * @param {Array<string>} props.choices - The array of choices for the question.
 * @returns {JSX.Element} The rendered quiz item component.
 */
function QuizItem({ question, isFinalQuestion, onNextQuestion, choices }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  // Use the question as part of the name attribute to ensure uniqueness
  const uniqueName = `onboarding_quiz_${question.replace(/\s+/g, "_")}`;

  return (
    <div
      style={{
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <fieldset>
        <legend>
          <i>{question}</i>
        </legend>
        {choices.map((choice, index) => (
          <div
            key={index}
            style={{
              display: "block",
              margin: "5px",
            }}
          >
            <input
              type="radio"
              id={`${uniqueName}_${choice}`}
              name={uniqueName}
              value={choice}
              key={index}
              onChange={handleChange}
              checked={selectedChoice === choice}
            />
            <label
              key={index * 10}
              htmlFor={`${uniqueName}_${choice}`}
              style={{
                paddingLeft: "4px",
                paddingRight: "8px",
              }}
            >
              {choice}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        style={{
          backgroundColor: "rgb(0, 123, 255)",
          color: "white",
          padding: "4px 8px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "5px",
          fontWeight: "bold",
          display: "block",
          justifyContent: "center",
          margin: "0 auto",
        }}
        disabled={selectedChoice === null}
        onClick={(event) => {
          // Prevent the form from being submitted
          event.preventDefault();
          if (selectedChoice !== null) {
            onNextQuestion(selectedChoice);
            setSelectedChoice(null);
          }
        }}
      >
        Next Question
      </button>
    </div>
  );
}

export default QuizItem;
