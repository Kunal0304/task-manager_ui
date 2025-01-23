import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './component/pages/Signin';
import Signup from './component/pages/Signup';
import ProtectedRoute from "./component/sharedcomponent/ProtectedRoute"
import Unauthorized from "./component/pages/Unauthorized"
import User from './component/pages/User';
import Notfound from "./component/pages/NotFound"
import Task from './component/pages/Task';
import AuthRoute from './component/sharedcomponent/AuthRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoute element={<Signin />} />} />
        <Route path="/signup" element={<AuthRoute element={<Signup />} />} />
        <Route path="/user" element={<ProtectedRoute role='Admin' element={<User/>} />} />
        <Route path="/task" element={<Task/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
