import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogIn from './LogIn/LogIn';
import Contacts from './Contacts/Contacts';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';

const App: React.FC = () => {

  const isAuth = useSelector((state: RootState) => state.auth.auth) 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to={`/contacts`} /> : <LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/contacts" element={isAuth ? <Contacts /> : <Navigate to={`/`} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
