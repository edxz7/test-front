import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AddProject from './pages/AddProject';
import EditProjectPage from './pages/EditProjectPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsPrivate from './components/IsPrivate';
import IsAnonymous from './components/IsAnonymous';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/projects" element={ <IsPrivate> <ProjectList/> </IsPrivate> }/>
        <Route path="/projects/:projectId" element={<IsPrivate> <ProjectDetailPage/> </IsPrivate> } />
        <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage/> </IsPrivate>  } />
        <Route path="/signup" element={ <IsAnonymous><Signup/></IsAnonymous> }/>
        <Route path="/login" element={ <IsAnonymous><Login/></IsAnonymous>}/>
      </Routes>
    </div>
  );
}

export default App;
