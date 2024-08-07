import React from "react";

import QuizItem from "./QuizItem";
import { zipObj } from "ramda";
import { fetchCollectionData } from "../../firebase/firebase";

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
    "How many years ago did you write your first Hello World program?",
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

const Actions = {
  SET_MEETUP_LINK: "SET_MEETUP_LINK",
  SET_DISCORD_LINK: "SET_DISCORD_LINK",
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
  const [socialLinks, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case Actions.SET_MEETUP_LINK:
          return { ...state, meetupLink: action.payload };
        case Actions.SET_DISCORD_LINK:
          return { ...state, discordLink: action.payload };
        default:
          return state;
      }
    },
    { meetupLink: "", discordLink: "" } // Fixed typo in 'discordLink'
  );
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [quizFailed, setQuizFailed] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from refreshing.
    const passedQuiz = await new Validator(QUESTIONS, answers)
      .runValidations(answers)
      .catch((err) => false);

    if (passedQuiz) {
      setQuizCompleted(true);
      setQuizFailed(false);
      fetchCollectionData("important_links")
        .then((links) => {
          const meetupLink = JSON.parse(JSON.stringify(links)).meetup_link
            .hyperlink;
          const discordLink = JSON.parse(JSON.stringify(links)).discord_link
            .hyperlink;
          dispatch({ type: Actions.SET_MEETUP_LINK, payload: meetupLink });
          dispatch({ type: Actions.SET_DISCORD_LINK, payload: discordLink });
        })
        .catch(console.error);
    } else {
      setQuizCompleted(true);
      setQuizFailed(true);
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
      setAnswers((previousAnswers) => [...previousAnswers, currentAnswer]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (quizCompleted && !quizFailed && notNullish(socialLinks)) {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          margin: "0 auto",
          backgroundColor: "lightBlue",
          color: "black",
          padding: "10px",
          border: "2px solid blue",
          borderRadius: "12px",
        }}
      >
        <p>
          Thank you for displaying your interest in joining us. We would like to
          welcome you to our online community. Stay tuned for our newsletter
          which should be released soon!
        </p>
        <div
          className="social-links"
          style={{
            flexBasis: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>
            <a
              href={socialLinks.meetupLink}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Click here
            </a>{" "}
            to join our Meetup group!
          </p>
          <p>
            <a
              href={socialLinks.discordLink}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Click here
            </a>{" "}
            to join our Discord server!
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          width: "100%",
          backgroundColor: "beige",
          border: "2px solid brown",
        }}
      >
        {currentQuestion + 1 <= questionsAndChoices.length && (
          <h4>
            Question #<b>{currentQuestion + 1}</b> of{" "}
            <b>{questionsAndChoices.length}</b>
          </h4>
        )}
        <div
          className="progress-bar"
          style={{
            flexBasis: "75%",
            width: "75%",
            backgroundColor: "gray",
            height: "10px",
            marginTop: "10px",
          }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentQuestion + 1) / questionsAndChoices.length) * 100 - 25
              }%`,
              backgroundColor: "green",
              height: "10px",
            }}
          ></div>
        </div>
        <form onSubmit={handleSubmit}>
          {questionsAndChoices
            .filter((_, index) => index === currentQuestion)
            .map(({ question, choices }, index) => (
              <div
                className="question"
                id={`question-${index + 1}`}
                key={index}
              >
                <QuizItem
                  question={question}
                  isFinalQuestion={
                    currentQuestion + 1 === questionsAndChoices.length
                  }
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
          {answers.length === questionsAndChoices.length && (
            <button
              role="submit"
              disabled={answers.length !== questionsAndChoices.length}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "4px 8px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              Submit Quiz
            </button>
          )}
        </form>
      </article>
    );
  }
}
class Validator {
  /**
   * Creates an instance of Validator.
   * @param {Array<string>} questions - The array of questions for the onboarding quiz.
   * @param {Array<string>} answers - The array of answers for the onboarding quiz.
   */
  constructor(questions = [], answers = []) {
    /**
     * The array of validation functions to be executed.
     * @type {Array<Function>}
     */
    this.validations = [
      Validator.WantsToJoin,
      Validator.AgreesWithCodeOfConduct,
    ];

    this.quizResults = zipObj(Object.values(questions), answers);
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

function isPrimitive(val) {
  return !Array.isArray(val) && !Object.prototype.isPrototypeOf(val);
}

function notNullish(obj) {
  return obj !== null && obj !== undefined && isPrimitive(obj)
    ? Object.values(obj).some(function hasNonDefaultPrimitiveValue(val) {
        return (
          val !== "" ||
          val !== null ||
          val !== undefined ||
          val !== false ||
          val !== 0 ||
          val !== NaN
        );
      })
    : true;
}

export default OnboardingQuiz;
