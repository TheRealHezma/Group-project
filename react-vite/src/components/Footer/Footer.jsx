import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Contributors:</p>
            <p>Hemza Mansour | Bobby Naluz | Eric Stevens | Gavin Musgrove</p>
            <p>
                <a href="https://github.com/TheRealHezma" target="_blank" rel="noreferrer">TheRealHezma</a> |
                <a href="https://github.com/bnaluz" target="_blank" rel="noreferrer">bnaluz</a> |
                <a href="https://github.com/stevenseb" target="_blank" rel="noreferrer">stevenseb</a> |
                <a href="https://github.com/GavinM404" target="_blank" rel="noreferrer">GavinM404</a>
            </p>

            <p>&copy; 2024 TaskWave. All rights reserved.</p>
        </footer>
    );
};

export default Footer;




// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './Footer.css';

// const Footer = () => {
//     const location = useLocation();

//     // Check if the current path is the home page (assuming home page is "/")
//     if (location.pathname !== '/') {
//         return null; // Do not render the footer if not on the home page
//     }

//     return (
//         <footer className="footer">
//             <p>Contributors:</p>
//             <p>Hemza Mansour | Bobby Naluz | Eric Stevens | Gavin Musgrove</p>
//             <p>
//                 <a href="https://github.com/TheRealHezma" target="_blank" rel="noreferrer">TheRealHezma</a> |
//                 <a href="https://github.com/bnaluz" target="_blank" rel="noreferrer">bnaluz</a> |
//                 <a href="https://github.com/stevenseb" target="_blank" rel="noreferrer">stevenseb</a> |
//                 <a href="https://github.com/GavinM404" target="_blank" rel="noreferrer">GavinM404</a>
//             </p>

//             <p>&copy; 2024 TaskWave. All rights reserved.</p>
//         </footer>
//     );
// };

// export default Footer;
