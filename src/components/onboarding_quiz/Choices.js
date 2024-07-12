import React from "react";

/**
 * Choices component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The choices to be rendered as children.
 * @param {function} props.handleVariableInputChange - The event handle for change events on a text input.
 * @param {function} props.handleChange - The event handler for change events on a radio input.
 * @returns {React.Element} JSX
 */
function Choices({ children, handleChange, handleVariableInputChange }) {
  // Clone children and pass handleChange as a prop to each Choice component
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        handleChange,
        handleVariableInputChange,
      });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
}

export default Choices;
