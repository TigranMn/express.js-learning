import { Routes, Route } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Table />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
