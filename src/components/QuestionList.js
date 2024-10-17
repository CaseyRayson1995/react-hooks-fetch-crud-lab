// QuestionList.js
import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) { // Receive props for delete and update functions
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem 
            key={question.id} 
            question={question} 
            onDeleteQuestion={onDeleteQuestion} // Pass delete function to QuestionItem
            onUpdateQuestion={onUpdateQuestion} // Pass update function to QuestionItem
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;


