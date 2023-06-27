import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import galleryIcon from "../../Images/gallery.png";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation() {
  return (
    <>
      <nav className="navbar navbar-light" style={{ backgroundColor: 'lightblue', height: '70px' }}>
        <a className="navbar-brand" href="#">
          <img src={galleryIcon} width="35" height="35" className="d-inline-block align-top" alt="" style={{ margin: '0 20px' }} />
          Photo Gallery
        </a>
      </nav>
    </>
  );
}
