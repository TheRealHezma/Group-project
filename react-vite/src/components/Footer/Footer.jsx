// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Contributors:</p>
            <p>Hemza Mansour | Bobby Naluz | Eric Stevens | Gavin Musgrove</p>
            <p>
                <a href="https://github.com/TheRealHezma" target="_blank">TheRealHezma</a> |
                <a href="https://github.com/bnaluz" target="_blank">bnaluz</a> |
                <a href="https://github.com/stevenseb" target="_blank">stevenseb</a> |
                <a href="https://github.com/GavinM404" target="_blank">GavinM404</a>
            </p>

            <p>&copy; 2024 TaskWave. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
