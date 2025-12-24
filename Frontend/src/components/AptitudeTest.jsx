import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Mcq.css";

const aptitudeQuestions = [
  { q: "If 5 pencils cost $15, how much do 8 pencils cost?", options: ["$20", "$24", "$25"], answer: 1 },
  { q: "What is the next number in the series: 2, 6, 12, 20, ?", options: ["28", "30", "32"], answer: 1 },
  { q: "A train travels 60 km in 45 minutes. What is its speed in km/h?", options: ["80 km/h", "90 km/h", "100 km/h"], answer: 1 },
  { q: "If a + b = 10 and a - b = 2, what is the value of a?", options: ["4", "6", "8"], answer: 1 },
  { q: "A shopkeeper sells an article at $150 with a 20% profit. What is the cost price?", options: ["$120", "$125", "$130"], answer: 0 },
  { q: "If 3x - 7 = 11, what is x?", options: ["6", "5", "4"], answer: 0 },
  { q: "Time taken by A alone to do a work is 12 days and B alone is 16 days. How long will they take together?", options: ["6 days", "7 days", "8 days"], answer: 2 },
  { q: "The average of 5 numbers is 20. If one number is 30, what is the average of the remaining 4 numbers?", options: ["18", "19", "20"], answer: 1 },
  { q: "A car travels 180 km at a speed of 60 km/h. How long will it take?", options: ["2 hrs", "3 hrs", "4 hrs"], answer: 1 },
  { q: "What comes next in the series: 5, 10, 20, 40, ?", options: ["60", "70", "80"], answer: 2 },
  { q: "If 5 pencils cost $15, how much do 8 pencils cost?", options: ["$20", "$24", "$25"], answer: 1 },
  { q: "What is the next number in the series: 2, 6, 12, 20, ?", options: ["28", "30", "32"], answer: 1 },
  { q: "A train travels 60 km in 45 minutes. What is its speed in km/h?", options: ["80 km/h", "90 km/h", "100 km/h"], answer: 1 },
  { q: "If a + b = 10 and a - b = 2, what is the value of a?", options: ["4", "6", "8"], answer: 1 },
  { q: "A shopkeeper sells an article at $150 with a 20% profit. What is the cost price?", options: ["$120", "$125", "$130"], answer: 0 },
  { q: "If 3x - 7 = 11, what is x?", options: ["6", "5", "4"], answer: 0 },
  { q: "Time taken by A alone to do a work is 12 days and B alone is 16 days. How long will they take together?", options: ["6 days", "7 days", "8 days"], answer: 2 },
  { q: "The average of 5 numbers is 20. If one number is 30, what is the average of the remaining 4 numbers?", options: ["18", "19", "20"], answer: 1 },
  { q: "A car travels 180 km at a speed of 60 km/h. How long will it take?", options: ["2 hrs", "3 hrs", "4 hrs"], answer: 1 },
  { q: "What comes next in the series: 5, 10, 20, 40, ?", options: ["60", "70", "80"], answer: 2 },
 
];

function AptitudeTest() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const submitTest = async () => {
    if (Object.keys(answers).length < aptitudeQuestions.length) {
      toast.error("Please answer all questions");
      return;
    }

    const score = aptitudeQuestions.reduce(
      (total, q, i) => total + (answers[i] === q.answer ? 1 : 0),
      0
    );

    const tokenData = localStorage.getItem("token");
    if (!tokenData) {
      toast.error("Please login first");
      return;
    }
    const { token } = JSON.parse(tokenData);

    try {
      setSubmitting(true);

      const res = await fetch("https://jobportal-jsnh.onrender.com/api/aptitude/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          applicationId: Number(applicationId),
          score
        }),
      });

      const msg = await res.text();
      if (!res.ok) throw new Error(msg);

      setResult(`✅ Test submitted successfully! Your score: ${score}/${aptitudeQuestions.length}`);
      toast.success(msg);

      setTimeout(() => navigate("/student"), 3000);

    } catch (err) {
      console.error(err);
      toast.error(`❌ Submission failed: ${err.message}`);
      setResult(`❌ Submission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="test-container">
      <h2>Aptitude Test</h2>
      {aptitudeQuestions.map((q, i) => (
        <div key={i} className="question-card">
          <p><strong>{i + 1}. {q.q}</strong></p>
          {q.options.map((opt, j) => (
            <label key={j} className="option">
              <input
                type="radio"
                name={`q-${i}`}
                checked={answers[i] === j}
                onChange={() => handleChange(i, j)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={submitTest}
        disabled={submitting}
        className="submit-btn"
      >
        {submitting ? "Submitting..." : "Submit Test"}
      </button>

      {result && <div style={{ marginTop: "20px", fontWeight: "bold" }}>{result}</div>}
    </div>
  );
}

export default AptitudeTest;




