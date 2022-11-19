import logo from './logo.svg';
import './App.css';
import Predict from './Predict';
import Register from './Register';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {


  return (
  <BrowserRouter>
     <Routes>
       <Route path="/" >
          <Route index element={<Register />} />
          <Route path="predict" element={<Predict />} />
          <Route path="register" element={<Register />} />
          <Route path="Login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
};




export default App;
