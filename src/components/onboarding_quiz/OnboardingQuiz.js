import React from "react";
import QuizQuestion from "./QuizQuestion";
import Choices from "./Choices";
import Choice from "./Choice";
import { zip } from "ramda";

/**@description This file contains a component that is responsible for the rendering of a quiz that asks the user qualifying questions about their experience with coding and willingness to join the group while complying with our code of conduct. It validates that the user is in a human that exudes excellence and shares our values before displaying our discord and meetup invite links.  */

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

const CHOICES = {
  EXPERIENCE_LEVEL: {
    novice: "less than 1 year",
    adept: "1-2 years",
    intermediate: "2-5 years",
    advanced: "5-8 years",
    expert: "8-12 years",
    master: "12+ years",
  },
  YES_OR_NO: ["Yes", "No"],
  ONE_PLUS_ONE: ["2", "3", "Other"],
};

function OnboardingQuiz(props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [questionsAndChoices, setQuestionsAndChoices] = React.useState([
    {
      question: QUESTIONS.doYouWannnaJoin,
      choices: CHOICES.YES_OR_NO,
    },
    {
      question: QUESTIONS.doYouHaveCommonSense,
      choices: CHOICES.ONE_PLUS_ONE,
    },
    {
      question: QUESTIONS.guageExperienceLevel,
      choices: [
        CHOICES.EXPERIENCE_LEVEL.novice,
        CHOICES.EXPERIENCE_LEVEL.adept,
        CHOICES.EXPERIENCE_LEVEL.intermediate,
        CHOICES.EXPERIENCE_LEVEL.advanced,
        CHOICES.EXPERIENCE_LEVEL.expert,
        CHOICES.EXPERIENCE_LEVEL.master,
      ],
    },
    {
      question: QUESTIONS.agreesWithCodeOfConduct,
      choices: CHOICES.YES_OR_NO,
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
    const passedQuiz = validateAnswers(QUESTIONS, answers);
    if (passedQuiz) {
      // TODO: If quiz was passed, show discord and meetup links.
      setQuizCompleted(true);
      const meetupLink = "https://www.meetup.com/coffee-code-philly/"; // TODO: Pull this from firestore
      alert(`Join our Meetup group; we meet every Saturday: ${meetupLink} `);
    }

    // This function validates the answers to the quiz. If all answers are answered and the user wants to join and agrees to the code of conduct, the user passes the quiz. Upon successful completion, the user is shown the discord and meetup links.
    function validateAnswers(questions = QUESTIONS, usersAnswers = answers) {
      const questionsAndAnswers = zip(questions, answers);

      class Validator {
        constructor(...customValidations) {
          this.questions = QUESTIONS;
          this.choices = CHOICES;
          this.validations = [
            Validator.AllQuestionsHaveBeenAnswered,
            Validator.WantsToJoin,
            Validator.AgreesWithCodeOfConduct,
          ];

          return {
            questions: this.questions,
            choices: this.choices,
            runValidations: function () {
              return new Promise((resolve, reject) => {
                Array.from([...this.validations, ...customValidations]).every(
                  (validator) => validator.apply([this.questions, this.answers])
                )
                  ? resolve("All checks have passed")
                  : reject(
                      "The following check failed:  " + validator.toString()
                    );
              });
            },
          };
        }

        static AllQuestionsHaveBeenAnswered = function (
          questions = this.questions,
          choices = this.choices
        ) {
          return choices.length === questions.length;
        };

        static WantsToJoin = function (
          questions = this.questions,
          choices = this.choices
        ) {
          const [, answer] = questions.filter(
            ([question]) =>
              question ===
              "Would you like to be a member of Coffee and Code Philly?"
          )[0];
          const [yes, _no] = choices.YES_OR_NO;
          return answer === yes;
        };

        static AgreesWithCodeOfConduct = function (
          questions = this.questions,
          choices = this.choices
        ) {
          const [, answer] = questions.filter(
            ([question]) =>
              question ===
              "Do you agree to be excellent towards yourself and other members of the Code and Coffee Philly group?"
          )[0];
          const [yes, _no] = choices.YES_OR_NO;
          return answer === yes;
        };
      }

      const validator = new Validator();
      return validator.runValidations();
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
