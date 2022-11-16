import logo from './logo.svg';
import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import PageNotFound from './Components/PageNotFound/PageNotFound';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { EthProvider } from "./contexts/EthContext";
import PostElection from './Components/PostElection/PostElection'
import PostVoter from './Components/PostVoter/PostVoter'
import PostParty from './Components/PostParty/PostParty'
import PostCandidate from './Components/PostCandidate/PostCandidate'

import AdminHome from './Components/AdminHome/AdminHome';
import VoterView from './Components/VoterPerspective/VoterView';
import VoteViewSystem from './Components/VoteViewSystem/VoteViewSystem';
import VoterLogin from './Components/VoterLogin/VoterLogin';






function App() {
  const navigate = useNavigate();
  
  const newLocal = 
  <>
  <div className="App">
      <Navbar />
      <EthProvider>
      <Routes>

      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/voterlogin" element={<VoterLogin />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/registerelection" element={<PostElection />} />
      <Route exact path="/registerparty" element={<PostParty />} />
      <Route exact path="/registercandidate" element={<PostCandidate />} />
      <Route exact path="/registervoter" element={<PostVoter />} />
      <Route exact path="/voterview" element={<VoterView />} />
      <Route exact path="/electionresult" element={<VoteViewSystem />} />
      
      <Route path="*" element={<PageNotFound />} />


      <Route path="/adminhome" element={<AdminHome />} />
    </Routes>
    </EthProvider>
    {/* <Footer /> */}
  </div>
    </>

  return (
       newLocal
  );
}

export default App;