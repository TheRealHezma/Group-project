// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Contributors:</p>
            {/* <p>Bobby Naluz I GitHub:<a href="https://github.com/bnaluz" rel='noopener'>bnaluz</a></p>
            <p>Eric Stevens I GitHub:<a href="https://github.com/stevenseb" rel='noopener'>stevenseb</a></p>
            <p>Gavin Musgrove I GitHub:<a href="https://github.com/GavinM404" rel='noopener'>GavinM404</a></p>
            <p>Hemza Masour I GitHub:<a href="https://github.com/TheRealHezma" rel='noopener'>TheRealHezma</a></p> */}
            <p>Hemza Mansour I Bobby Naluz I Eric Stevens I Gavin Musgrove</p>
            <p><a href="https://github.com/TheRealHezma" rel='noopener'>TheRealHezma</a> I <a href="https://github.com/bnaluz" rel='noopener'>bnaluz</a> I <a href="https://github.com/stevenseb" rel='noopener'>stevenseb</a> I <a href="https://github.com/GavinM404" rel='noopener'>GavinM404</a></p>

            <p>&copy; 2024 TaskWave. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
