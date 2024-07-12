import React from "react";
import QuizQuestion from "./QuizQuestion";
import Choices from "./Choices";
import Choice from "./Choice";
import VariableChoice from "./VariableChoice";

/**
 *
 * @param {*} props
 * @returns {React.Element} JSX
 */
function OnboardingQuiz(props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [questions, setQuestions] = React.useState([
    {
      question: "Would you like to be a member of Coffee and Code Philly?",
      choices: ["Yes", "No", "Maybe another time"],
    },
    {
      question: "What is 1 + 1?",
      choices: ["2", "3", "Neither", "Both"],
    },
    {
      question: "In what year did you write your first Hello World program?",
      choices: [], // Custom input
    },
  ]);
  const [answers, setAnswers] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from refreshing.
    console.log(event);
    alert("Thank you for your participation.");
  };

  return (
    <article>
      <h1>Attempt Membership Challenge</h1>
      <form onSubmit={handleSubmit}>
        {questions
          .filter((_, index) => index === currentQuestion)
          .map(({ question, choices }, index) => {
            return (
              <div
                className="question"
                id={`question-${index + 1}`}
                key={index}
              >
                <QuizQuestion question={question}>
                  <Choices>
                    {choices.length ? (
                      // Render radio inputs
                      choices.map((choice, idx) => (
                        <Choice key={idx}>{choice}</Choice>
                      ))
                    ) : (
                      // Render text input
                      <VariableChoice />
                    )}
                  </Choices>
                </QuizQuestion>
              </div>
            );
          })}
        <button type="submit">Submit</button>
      </form>
    </article>
  );
}

export default OnboardingQuiz;
