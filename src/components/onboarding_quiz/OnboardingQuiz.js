import React from "react";
import QuizQuestion from "./QuizQuestion";
import Choices from "./Choices";
import Choice from "./Choice";

/**
 *
 * @param {*} props
 * @returns {React.Element} JSX
 */
function OnboardingQuiz(props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [questionsAndChoices, setQuestionsAndChoices] = React.useState([
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
      choices: [
        "less than 1 year ago", // Novice
        "1-3 years ago", // Adept
        "4-5 years ago", // Intermediate
        "10 or more years ago", // Advanced
      ],
    },
  ]);
  const [answers, setAnswers] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from refreshing.
    console.log("Quiz completed!");
    // TODO: Check for correct answers, if any.
    // TODO: If quiz was passed, show discord and meetup links.
  };

  const onNextQuestion = (
    currentQuestionsState,
    answersState,
    currentAnswer
  ) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] =
      currentQuestionsState;
    const [answers, setAnswers] = answersState;

    if (currentQuestionIndex <= questionsAndChoices.length) {
      setAnswers(answers.concat(currentAnswer));
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions have been answered
      handleSubmit();
    }
  };

  return (
    <article>
      <h1>Attempt Membership Challenge</h1>
      <form onSubmit={handleSubmit}>
        {questionsAndChoices
          .filter((_, index) => index === currentQuestion)
          .map(({ question, choices }, index) => (
            <div className="question" id={`question-${index + 1}`} key={index}>
              <QuizQuestion
                question={question}
                onNextQuestion={(currentAnswer) =>
                  onNextQuestion(
                    [currentQuestion, setCurrentQuestion],
                    [answers, setAnswers],
                    currentAnswer
                  )
                }
              >
                <Choices>
                  {choices.map((choice, idx) => (
                    <Choice key={idx}>{choice}</Choice>
                  ))}
                </Choices>
              </QuizQuestion>
            </div>
          ))}
        {/** You can only submit the quiz once all questions have been answered */}
        <button
          type="submit"
          hidden={currentQuestion !== questionsAndChoices.length}
          style={{ backgroundColor: "hotpink", border: "1px solid blue" }}
        >
          Submit
        </button>
      </form>
    </article>
  );
}

export default OnboardingQuiz;
