import React, { useState } from "react";

/**
 * Renders a quiz question component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.question - The question to be displayed.
 * @param {function} props.onNextQuestion - The function to be called when the "Next Question" button is clicked.
 * @param {ReactNode} props.children - The choices to be rendered as children.
 * @returns {JSX.Element} The rendered quiz question component.
 */
// eslint-disable-next-line react/prop-types
function QuizQuestion({ question, onNextQuestion, children }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        handleChange,
      });
    }
    return child;
  });

  return (
    <div>
      <fieldset>
        <legend>{question}</legend>
        {/** Renders choices as children in the form of radio buttons or a custom input */}
        {childrenWithProps}
      </fieldset>
      <button
        onClick={(event) => {
          // Prevent the form from being submitted by cancelling default button behavior within a form
          event.preventDefault();
          onNextQuestion(selectedChoice);
        }}
      >
        Next Question
      </button>
    </div>
  );
}

export default QuizQuestion;
