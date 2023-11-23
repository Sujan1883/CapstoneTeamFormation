import React from 'react'
import './Footer.css';


export const Footer = () => {
  return (
     <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Team-Up</p>
        <div className="footer-social-icons">
          <button className="social-button" disabled>
            <i className="fab fa-facebook"></i>
          </button>
          <button className="social-button" disabled>
            <i className="fab fa-twitter"></i>
          </button>
          <button className="social-button" disabled>
            <i className="fab fa-linkedin"></i>
          </button>
          {/* Add more social buttons as needed */}
        </div>
      </div>
    </footer>
  )
}
