import React from "react";
import QuizQuestion from "./QuizQuestion";
import Choices from "./Choices";
import Choice from "./Choice";

/**
 *
 * @param {*} props
 * @returns {React.Element} JSX
 */

function OnboardinQuiz(props) {
  const handleSubmit = (selectedChoice) => {
    alert(`You selected: ${selectedChoice}`);
  };

  return (
    <article>
      <h1>Attempt Membership Challenge</h1>
      {/** Questions */}
      <div class="question" id="question-1">
        <QuizQuestion
          question="Would you like to be a member of Coffee and Code Philly?"
          onSubmit={handleSubmit}
        >
          <Choices>
            <Choice onSelection={() => {}}>Yes</Choice>
            <Choice onSelection={() => {}}>No</Choice>
            <Choice onSelection={() => {}}>Maybe another time</Choice>
          </Choices>
        </QuizQuestion>

        <div class="question" id="question-2">
          <QuizQuestion question="What is 1 + 1?">
            <Choices>
              <Choice onSelection={() => {}}>2</Choice>
              <Choice onSelection={() => {}}>3</Choice>
              <Choice onSelection={() => {}}>Neither</Choice>
              <Choice onSelection={() => {}}>Both</Choice>
            </Choices>
          </QuizQuestion>
        </div>

        <div class="question" id="question-3">
          <QuizQuestion question="how many years ago from today have you authored your first 'Hello, World!' program?">
            <Choices>
              <Choice onSelection={() => {}}>Last year</Choice>
              <Choice onSelection={() => {}}>2-4 years ago</Choice>
              <Choice onSelection={() => {}}>5-9 years ago</Choice>
              <Choice onSelection={() => {}}>Never ever</Choice>
              <Choice onSelection={() => {}}>Over 10 years ago</Choice>
            </Choices>
          </QuizQuestion>
        </div>
      </div>
    </article>
  );
}

export default OnboardinQuiz;
