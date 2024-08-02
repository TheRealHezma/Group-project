import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Navigation() {
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const [userBoards, setUserBoards] = useState([]);
  const user = useSelector((store) => store.session.user);

  useEffect(() => {
    const currentHour = new Date().getHours();
    let greetingMessage = "";

    if (user) {
      // If user is logged in
      if (currentHour < 12) {
        greetingMessage = `Good morning, ${user.username}! Let's get to work.`;
      } else if (currentHour < 18) {
        greetingMessage = `Good afternoon, ${user.username}! Let's get to work.`;
      } else {
        greetingMessage = `Good evening, ${user.username}! Let's get to work.`;
      }
    } else {
      // If no user is logged in
      if (currentHour < 12) {
        greetingMessage = "Good morning! Let's be productive today.";
      } else if (currentHour < 18) {
        greetingMessage = "Good afternoon! Let's be productive today.";
      } else {
        greetingMessage = "Good evening! Let's be productive today.";
      }
    }

    setGreeting(greetingMessage);
  }, [user]);

  useEffect(() => {
    // Fetch user boards when the component mounts
    fetch('/api/my-boards')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserBoards(data.boards); // check and fix later
      })
      .catch(error => {
        console.error("There was an error fetching the boards:", error);
      });
  }, []);

  const handleNewBoard = () => {
    navigate('/api/boards');
  };

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          <img src="/TaskWaveNarrow.png" alt="TaskWave" className="logo" />
        </NavLink>
      </li>
      <li className="dropdown">
        <button className="dropdown-toggle">
          My Boards
        </button>
        <ul className="dropdown-menu">
          {userBoards.length > 0 ? (
            userBoards.map(board => (
              <li key={board.id}>
                <NavLink to={`/boards/${board.id}`}>{board.name}</NavLink>
              </li>
            ))
          ) : (
            <li>No boards available</li>
          )}
        </ul>
      </li>
      <li>
        <button className="new_Board" onClick={handleNewBoard}>
          New Board
        </button>
      </li>
      <li>{greeting}</li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
