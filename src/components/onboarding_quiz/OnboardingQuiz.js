import React from "react";
import QuizItem from "./QuizItem";
import { zipObj } from "ramda";

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
  captureEmail: "What is your email address?",
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
  ONE_PLUS_ONE: ["3", "2", "Other"],
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
      choices: Object.values(CHOICES.EXPERIENCE_LEVEL),
    },
    {
      question: QUESTIONS.agreesWithCodeOfConduct,
      choices: CHOICES.YES_OR_NO,
    },
  ]);
  const [answers, setAnswers] = React.useState([]);
  const [meetupLink, setMeetupLink] = React.useState(undefined);
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  // React.useEffect(() => {
  //   fetch("/coffee-and-code-philly-w-c03af/us-central1/getMeetupLink", {
  //     method: "GET",
  //   })
  //     // .then((response) => response.json())
  //     .then(({ data }) => {
  //       console.log("here", data);
  //       setMeetupLink(data);
  //     })
  //     .catch((err) => console.error("whoops", err));
  // }, [quizCompleted]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from refreshing.
    const passedQuiz = await new Validator(QUESTIONS, answers)
      .runValidations(answers)
      .catch((err) => false);

    if (passedQuiz) {
      // TODO: If quiz was passed, show discord and meetup links.
      setQuizCompleted(true);
      const meetupLink = "https://www.meetup.com/coffee-code-philly/"; // TODO: Pull this from firestore
      alert(`Join our Meetup group; we meet every Saturday: ${meetupLink} `);
    }
  };

  const onNextQuestion = (
    currentQuestionState,
    answersState,
    currentAnswer
  ) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] =
      currentQuestionState;
    const [, setAnswers] = answersState;

    if (
      currentQuestionIndex <= questionsAndChoices.length - 1 &&
      currentAnswer
    ) {
      console.log({ currentAnswer });
      setAnswers((previousAnswers) => [...previousAnswers, currentAnswer]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
              <QuizItem
                question={question}
                choices={choices}
                onNextQuestion={(currentAnswer) =>
                  onNextQuestion(
                    [currentQuestion, setCurrentQuestion],
                    [answers, setAnswers],
                    currentAnswer
                  )
                }
              />
            </div>
          ))}
        {quizCompleted && meetupLink && (
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
class Validator {
  /**
   * Creates an instance of Validator.
   * @param {Array<string>} questions - The array of questions for the onboarding quiz.
   * @param {Array<string>} answers - The array of answers for the onboarding quiz.
   */
  constructor(questions = [], answers = []) {
    /**
     * The array of questions for the onboarding quiz.
     * @type {Array<string>}
     */
    this.questions = questions;

    /**
     * The array of user selected answers for the onboarding quiz.
     * @type {Array<string>}
     */
    this.answers = answers;

    /**
     * The choices available for each question.
     * @type {Object}
     */
    this.choices = CHOICES;

    /**
     * The array of validation functions to be executed.
     * @type {Array<Function>}
     */
    this.validations = [
      Validator.WantsToJoin,
      Validator.AgreesWithCodeOfConduct,
    ];

    this.quizResults = zipObj(Object.values(this.questions), answers);
  }

  /**
   * Checks if the user wants to join.
   * @param {Array<string>} questions - The array of questions.
   * @param {Array<string>} choices - The array of choices.
   * @returns {boolean} - True if the user wants to join, false otherwise.
   */
  static WantsToJoin(quizResults) {
    return Object.entries(quizResults).some(([question, answer]) => {
      const [yes, _no] = CHOICES.YES_OR_NO;
      return question === QUESTIONS.doYouWannnaJoin && answer === yes;
    });
  }

  /**
   * Checks if the user agrees with the code of conduct.
   * @param {Array<string>} questions - The array of questions.
   * @param {Array<string>} choices - The array of choices.
   * @returns {boolean} - True if the user agrees with the code of conduct, false otherwise.
   */
  static AgreesWithCodeOfConduct(quizResults) {
    return Object.entries(quizResults).some(([question, answer]) => {
      const [yes, _no] = CHOICES.YES_OR_NO;
      return question === QUESTIONS.agreesWithCodeOfConduct && answer === yes;
    });
  }

  /**
   * Runs all the validations.
   * @returns {Promise<boolean>} - A promise that resolves true if all checks have passed, or rejects with false if any check fails.
   */
  runValidations() {
    const allValiadtionsSucceed = this.validations.every((validator) => {
      return validator.call(null, this.quizResults);
    });
    return new Promise((resolve, reject) => {
      if (allValiadtionsSucceed) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}

export default OnboardingQuiz;
