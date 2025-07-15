import { useState } from "react";
import axios from "axios"; // ✅ Import axios

function App() {
  const [registered, setRegistered] = useState(false); // ✅ Boolean instead of string

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://20.244.56.144/evaluation-service/register",
        {
          email: "aditbisht24@gmail.com",
          name: "Aditya Bisht",
          mobileNo: "9917522589",
          githubUsername: "Aditbise",
          rollNo: "218203",
          accessCode: "QAhDUr" 
        }
      );

      localStorage.setItem("clientID", response.data.clientID);
      localStorage.setItem("clientSecret", response.data.clientSecret);

      alert("✅ Registered! ClientID & Secret saved.");
      setRegistered(true);
    } catch (err) {
      console.error("Registration fail");
    }
  };

  return (
    <>
      <h1>URL Shortener</h1>
      <div style={{ padding: "20px" }}>
        <h1>Candidate Registration</h1>

        {!registered ? ( 
          <button onClick={handleSubmit}>Register Now</button>
        ) : (
          <p>Registered</p>
        )}
      </div>
    </>
  );
}

export default App;
