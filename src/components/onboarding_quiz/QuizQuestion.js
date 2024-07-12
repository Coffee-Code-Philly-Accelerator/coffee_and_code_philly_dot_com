import React, { useState } from "react";

/**
 * QuizQuestion component
 *
 * @param {Object} props
 * @param {string} props.question - The question to be asked.
 * @param {React.ReactNode} props.children - The choices to be rendered as children.
 * @returns {React.Element} JSX
 */
function QuizQuestion({ question, children }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { handleChange });
    }
    return child;
  });

  return (
    <div>
      <fieldset>
        <legend>{question}</legend>
        {childrenWithProps}
        {selectedChoice && <p>Selected choice: {selectedChoice}</p>}
      </fieldset>
      <button>Next Question</button>
    </div>
  );
}

export default QuizQuestion;
