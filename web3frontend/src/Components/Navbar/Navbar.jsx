import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const Home = (e) => {
    e.preventDefault();
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
  <a className="navbar-brand" style={{margin: "0px 50px", color: "#40f588"}} href="#!">DecentralizedVotingSystem</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#!navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav text-light">
      <a className="nav-item nav-link text-light"  href="!#" onClick={Home}>Home </a>
      <a className="nav-item nav-link text-light" href="#!">About the Team.</a>
    </div>
  </div>
</nav>
  )
}

export default Navbar