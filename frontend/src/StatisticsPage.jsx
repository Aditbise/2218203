import { useEffect, useState } from "react";
import axios from "axios";

function StatisticsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://20.244.56.144/evaluation-service/logs", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUrls(response.data); 
      } catch (err) {
        console.error("Failed to fetch stats:", err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>URL Shortener Statistics</h1>

      {urls.length === 0 ? (
        <p>No shortened URLs found</p>
      ) : (
        urls.map((url, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "15px 0",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <p><b>Short URL:</b> <a href={url.shortUrl}>{url.shortUrl}</a></p>
            <p><b>Original URL:</b> {url.originalUrl}</p>
            <p><b>Created At:</b> {new Date(url.createdAt).toLocaleString()}</p>
            <p><b>Expires At:</b> {new Date(url.expiresAt).toLocaleString()}</p>
            <p><b>Total Clicks:</b> {url.totalClicks}</p>

            <h4>Click Details:</h4>
            {url.clicks.length === 0 ? (
              <p>No clicks yet</p>
            ) : (
              <ul>
                {url.clicks.map((click, i) => (
                  <li key={i}>
                    {new Date(click.timestamp).toLocaleString()} - From{" "}
                    {click.source || "unknown"} ({click.location})
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StatisticsPage;
