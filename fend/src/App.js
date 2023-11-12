import './App.css';
import React from "react"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import PrimaryPage from './PrimaryPage';
import MainApp from "./MainApp.js"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PrimaryPage/>}/>
          <Route path="./mainapp" element={<MainApp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
