import React from "react";

/**
 * Choices component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The choices to be rendered as children.
 * @param {function} props.handleChange - The event handler for change events.
 * @returns {React.Element} JSX
 */
function Choices({ children, handleChange }) {
  // Clone children and pass handleChange as a prop to each Choice component
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { handleChange });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
}

export default Choices;
