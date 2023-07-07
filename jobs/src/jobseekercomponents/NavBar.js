import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const SideNavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="side-navbar">
      <Navbar.Toggle aria-controls="side-nav" />
      <Navbar.Collapse id="side-nav">
        <Nav className="flex-column">
          <NavLink exact to="/" activeClassName="active" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/ViewJobs" activeClassName="active" className="nav-link">
            View Jobs
          </NavLink>
          <NavLink to="/PostJobs" activeClassName="active" className="nav-link">
            Post Jobs
          </NavLink>
          <NavLink to="/updateJob" activeClassName="active" className="nav-link">
            Update Jobs
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SideNavigationBar;
