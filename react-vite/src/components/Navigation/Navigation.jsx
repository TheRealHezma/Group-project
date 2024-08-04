import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect, useState } from "react";

function Navigation({ isLoaded }) {
  const [greeting, setGreeting] = useState("");
  const [userBoards, setUserBoards] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the current board ID from URL parameters
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const currentHour = new Date().getHours();
    let greetingMessage = "";

    if (currentHour < 12) {
      greetingMessage = "Good morning! Let's get to work.";
    } else if (currentHour < 18) {
      greetingMessage = "Good afternoon! Let's get to work.";
    } else {
      greetingMessage = "Good evening! Let's get to work.";
    }

    setGreeting(greetingMessage);
  }, []);

  useEffect(() => {
    if (user) {
      fetch("/api/boards/current")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserBoards(data.Boards);
        })
        .catch((error) => {
          console.error("There was an error fetching the boards:", error);
        });
    }
  }, [user]);

  const handleNewBoard = () => {
    navigate("/api/boards");
  };

  const currentBoard = userBoards.find(board => board.id === Number(id)); // Find the current board based on the URL

  return (
    <ul className="navigation">
      <li className="logo-container">
        <NavLink exact to="/">
          <img src="/TaskWaveNarrow.png" alt="TaskWave" className="logo" />
        </NavLink>
      </li>
      {isLoaded && user && (
        <>
          <li>
            <button className="new_Board" onClick={handleNewBoard}>
              New Board
            </button>
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
