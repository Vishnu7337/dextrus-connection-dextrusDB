import logo from './logo.svg';
import './App.css';
import Connection from './Components/Connection';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Catalog from './Components/Home';


function App() {
  return (
    <div className="App">
      {/* <Connection></Connection>  */}
      <BrowserRouter>
        <Routes>
          <Route path="/Catalog" exact element={<Catalog></Catalog>} />
          <Route path="/" exact element={<Connection></Connection>} />
        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
