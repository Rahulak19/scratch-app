import "./App.css";
import DisplayArea from "./components/DisplayArea";
import Header from "./components/Header";
import MidArea from "./components/MidArea";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="main_app">
        <div className="header">
          <Header />
        </div>
        <div className="main__content">
          <Sidebar />
          <MidArea />
          <DisplayArea />
        </div>
      </div>
    </>
  );
}

export default App;
