import { useState } from "react";
import axios from "axios"; 
import StatisticsPage from "./StatisticsPage";
function App() {
  const [token, setToken] = useState("");
  const [showStats, setShowStats] = useState(false);
  const handleSubmit = async () => {
  //     try {
  //     const response = await axios.post(
  //       "http://20.244.56.144/evaluation-service/register",
  //       {
  //         email: "aditbisht24@gmail.com",
  //         name: "Aditya Bisht",
  //         mobileNo: "9917522589",
  //         githubUsername: "Aditbise",
  //         rollNo: "218203",
  //         accessCode: "QAhDUr"
  //       }
  //     );

  //     localStorage.setItem("clientID", response.data.clientID);
  //     localStorage.setItem("clientSecret", response.data.clientSecret);

  //     alert("Registered successfully. ClientID and Secret saved.");
  //     setRegistered(true);
  //   } catch (err) {
  //     console.error("Registration failed:", err.response?.data || err.message);
  //     alert("Registration failed.");
  //   }
  // };
    // try {
    //   const response = await axios.post(
    //     "http://20.244.56.144/evaluation-service/auth",
    //     {
    //       email: "aditbisht24@gmail.com",
    //       name: "Aditya Bisht",
    //       rollNo: "218203",
    //       accessCode: "QAhDUr",
    //       clientID:"3fd3cfff-73db-4dbb-8272-11ee42b03a71",
    //       clientSecret:"SduyMSAesDUpuPWz",
    //     }
    //   );

    //   setToken(response.data.token);
    //   localStorage.setItem("authToken", response.data.access_token);

    //   alert("token saved");
    //   console.log("Token:", response.data.access_token);
    // } catch (err) {
    //   console.error("Authentication failed:");
    // }
    Log("frontend", "info", "api", "Starting authentication request");

  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      {
        email: "aditbisht24@gmail.com",
        name: "Aditya Bisht",
        rollNo: "218203",
        accessCode: "QAhDUr",
        clientID:"3fd3cfff-73db-4dbb-8272-11ee42b03a71",
        clientSecret:"SduyMSAesDUpuPWz",
      }
    );
    Log("frontend", "info", "auth", "Token received successfully");

    setToken(response.data.access_token);
    localStorage.setItem("authToken", response.data.access_token);

  } catch (err) {
    Log("frontend", "error", "handler", `Auth failed: ${err.message}`);
  }
  };

  const Log= async(stack,level,pkg,message)=>{
    try{

      await axios.post("http://20.244.56.144/evaluation-service/logs", {
        stack,      
        level,      
        package: pkg,
        message,     
        timestamp: new Date().toISOString()
      });
    }catch{
      console.error("Failed logging");
    }

  }

  return (
    <>
      <h1>URL Shortener</h1>
      <div>
        <h1>Candidate Authorization</h1>

        {!token ? ( 
          <button onClick={handleSubmit}>Authorize</button>
        ) : (
          <div>
            <p>Authorized</p>
            <button onClick={() => setShowStats(!showStats)}>
              {showStats ? "Hide Statistics" : "Show Statistics"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
