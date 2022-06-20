import "./App.css";
import Routes from "./router";

function App() {
  return (
    <div className="App">
      <div className="flex h-screen flex-col justify-between">
        <Routes />
        <div className="App-footer">
          <a href="https://www.facebook.com/zcyrel/">
            &copy; 2022 by SuperZcyan
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
