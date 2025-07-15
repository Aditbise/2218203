import { useState } from 'react';

function App() {
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {

  };

  return (
    <>
      <h1>URL Shortener</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="submit">Shorten</button>
        </form>
      </div>
    </>
  );
}

export default App;
