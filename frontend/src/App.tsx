import React from "react";
import "./App.css";
import { RouterManagement } from "./components/RouterManagement";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="App-title">DriveNets Dashboard</h1>
        </div>
      </header>
      <main className="App-main">
        <RouterManagement />
      </main>
    </div>
  );
}

export default App;
