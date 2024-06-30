import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "../../utility/axios";

const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/questions/");
        setAllQuestions(response.data|| []);
		console.log(response)
      } catch (err) {
        alert("An error occurred while fetching the questions.");
        console.log("problem", err);
      }
    }
    fetchData();
  }, []);

  console.log(allQuestions);
  return (
    <div className="container my-5 home-container">
      <div className="d-flex mb-5 justify-content-between">
        <Link to="AskQuestion">
          <button className="ask_button">Ask Question</button>
        </Link>
        {/* <h4>Welcome</h4> */}
      </div>
      <h3>Questions</h3>
      <br />
      <div>
        {allQuestions.length > 0 ? (
          allQuestions.map((question) => (
            <div key={question.question_id}>
              <Link
                to={`/SingleQuestion/${question.question_id}`}
                className="text-decoration-none text-reset"
              >
                <hr />
                <h5 className="link-hoverorange">{question.question}</h5>
                <p>{question.category}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
