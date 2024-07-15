import React from "react";

/**
 * Choice component
 *
 * @param {Object} props
 * @param {string} props.children - The text of the choice.
 * @param {function} props.handleChange - The event handler for change events.
 * @returns {React.Element} JSX
 */
function Choice({ children, handleChange }) {
  return (
    <>
      <input
        type="radio"
        name="quizChoice"
        value={children}
        onChange={handleChange}
      />
      {children}
    </>
  );
}

export default Choice;
