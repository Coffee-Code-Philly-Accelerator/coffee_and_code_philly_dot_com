/* eslint-disable react/prop-types */
import React, { useState } from "react";

/**
 * Renders a quiz item component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.question - The question to be displayed.
 * @param {function} props.onNextQuestion - The callback function to be called when the next question button is clicked.
 * @param {Array<string>} props.choices - The array of choices for the question.
 * @returns {JSX.Element} The rendered quiz item component.
 */
function QuizItem({ question, onNextQuestion, choices }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  // Use the question as part of the name attribute to ensure uniqueness
  const uniqueName = `onboarding_quiz_${question.replace(/\s+/g, "_")}`;

  return (
    <div>
      <fieldset>
        <legend>{question}</legend>
        {choices.map((choice, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={`${uniqueName}_${choice}`}
              name={uniqueName}
              value={choice}
              key={index}
              onChange={handleChange}
              checked={selectedChoice === choice}
            />
            <label key={index} htmlFor={`${uniqueName}_${choice}`}>
              {choice}
            </label>
          </React.Fragment>
        ))}
      </fieldset>
      <button
        onClick={(event) => {
          // Prevent the form from being submitted
          event.preventDefault();
          if (selectedChoice !== null) {
            onNextQuestion(selectedChoice);
          }
        }}
      >
        Next Question
      </button>
    </div>
  );
}

export default QuizItem;
