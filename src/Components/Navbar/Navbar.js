import React from 'react';
import galleryIcon from "../../Images/gallery.png";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation() {
  return (
    <>
      <nav className="navbar navbar-light" style={{ backgroundColor: 'lightblue', height: '70px' }}>
        <div className="navbar-brand">
          <img src={galleryIcon} width="35" height="35" className="d-inline-block align-top" alt="" style={{ margin: '0 20px' }} />
          Photo Gallery
        </div>  
      </nav>
    </>
  );
}
