// src/Navigation.js
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink exact to="/">
          <img src="/TaskWaveNarrow.png" alt="TaskWave" className="logo" />
        </NavLink>
      </li>
      {(isLoaded && user) && ( //added parenth around is loaded and user
        <>
          {/* <li className="create-board-button"> */}
          <li>

            <OpenModalButton buttonText={'Create Board'} modalComponent={<NewBoardModal />} className='create-board-button' />
          </li>
          <li className="dropdown middle">
            <button className="dropdown-toggle">
              {currentBoard ? currentBoard.name : "My Boards"}

              <span className="arrow-down">▼</span>
            </button>
            <ul className="dropdown-menu">
              {userBoards.length > 0 ? (
                userBoards.map((board) => (
                  <li key={board.id}>
                    <NavLink to={`/boards/${board.id}`}>{board.name}</NavLink>
                  </li>
                ))
              ) : (
                <li>No boards available</li>
              )}
            </ul>
          </li>
        </>
      )}
      <li>{greeting}</li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
