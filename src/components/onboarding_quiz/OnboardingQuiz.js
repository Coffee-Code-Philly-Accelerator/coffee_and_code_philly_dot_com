import React from "react";
import QuizQuestion from "./QuizQuestion";
import Choices from "./Choices";
import Choice from "./Choice";
import { zip } from "ramda";

/**
 *
 * @param {*} props
 * @returns {React.Element} JSX
 */

const QUESTIONS = {
  doYouWannnaJoin: "Would you like to be a member of Coffee and Code Philly?",
  doYouHaveCommonSense: "What is 1 + 1?", // This is a trick question
  guageExperienceLevel:
    "In what year did you write your first Hello World program?",
  agreesWithCodeOfConduct:
    "Do you agree to be excellent towards yourself and other members of the Code and Coffee Philly group?",
};

function OnboardingQuiz(props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [questionsAndChoices, setQuestionsAndChoices] = React.useState([
    {
      question: QUESTIONS.doYouWannnaJoin,
      choices: ["Yes", "No", "Maybe another time"],
    },
    {
      question: QUESTIONS.doYouHaveCommonSense,
      choices: ["2", "3", "Neither", "Both"],
    },
    {
      question: QUESTIONS.guageExperienceLevel,
      choices: [
        "less than 1 year ago", // Novice
        "1-3 years ago", // Adept
        "4-5 years ago", // Intermediate
        "6-9 years ago", // Expert
        "10 or more years ago", // Master
      ],
    },
    {
      question: QUESTIONS.agreesWithCodeOfConduct,
      choices: ["Yes", "No"],
    },
  ]);
  const [answers, setAnswers] = React.useState([]);
  const [meetupLink, setMeetupLink] = React.useState("");
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  React.useEffect(() => {
    fetch("/coffee-and-code-philly-w-c03af/us-central1/getMeetupLink", {
      method: "GET",
    })
      // .then((response) => response.json())
      .then(({ data }) => {
        console.log("here", data);
        setMeetupLink(data);
      })
      .catch((err) => console.error("whoops", err));
  }, [quizCompleted]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from refreshing.
    const passedQuiz = validateAnswers(
      questionsAndChoices.map(({ question }) => question),
      answers
    );
    if (passedQuiz) {
      // TODO: If quiz was passed, show discord and meetup links.
      setQuizCompleted(true);
    }

    // This function validates the answers to the quiz. If all answers are answered and the user wants to join and agrees to the code of conduct, the user passes the quiz. Upon successful completion, the user is shown the discord and meetup links.
    function validateAnswers(questions, answers) {
      const questionsAndAnswers = zip(questions, answers);

      const allQuestionsHaveBeenAnswered = (questions, answers) =>
        answers.length === questions.length;

      const wantsToJoin = (questions, answers) => {
        const [, answer] = questionsAndAnswers.filter(
          ([question]) =>
            question ===
            "Would you like to be a member of Coffee and Code Philly?"
        )[0];
        return answer === "Yes";
      };

      const agreedToCodeOfConduct = (questions, answers) => {
        const [, answer] = questionsAndAnswers.filter(
          ([question]) =>
            question ===
            "Do you agree to be excellent towards yourself and other members of the Code and Coffee Philly group?"
        )[0];
        return answer === "Yes";
      };

      let validations = [
        allQuestionsHaveBeenAnswered,
        wantsToJoin,
        agreedToCodeOfConduct,
      ];

      return validations.every((validation) => validation(questions, answers));
    }
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
        {meetupLink && (
          <a href={meetupLink} target="_blank" rel="noreferrer">
            Join our Meetup group
          </a>
        )}

        {/** A user can only submit the quiz once all questions have been answered */}
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
