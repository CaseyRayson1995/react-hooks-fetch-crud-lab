import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  function addQuestion(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }


  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
          );
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  
  function updateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === updatedQuestion.id ? updatedQuestion : question
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList 
          questions={questions} 
          onDeleteQuestion={deleteQuestion} 
          onUpdateQuestion={updateQuestion} 
        />
      )}
    </main>
  );
}

export default App;



