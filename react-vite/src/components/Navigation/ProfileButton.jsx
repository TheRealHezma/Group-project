import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className={`profile-button-container ${showMenu ? "show" : ""}`}>
      <button onClick={toggleMenu} className="profile-button">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li className="profile-info">{user.username}</li>
              <li className="profile-info">{user.email}</li>
              <li className="profile-logout">
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
