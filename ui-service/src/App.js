import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
    return (<Routes>
      <Route path="/ui/dashboard" element={<Dashboard />} />
      <Route path="/ui/" element={<Login />} />
   </Routes>);
}

export default App;
