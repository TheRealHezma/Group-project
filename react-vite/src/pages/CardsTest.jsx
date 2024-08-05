import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCards } from '../redux/card';
import { Link } from 'react-router-dom';
import './Splash.css';


const CardsTest = () => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.cards.allCards);
  
    useEffect(() => {
      dispatch(getAllCards(1));
    }, [dispatch]);
  
    return (
      <div className="splash-container">
        {Object.keys(cards).length === 0 ? (
          <h1>CREATE YOUR FIRST CARD!</h1>
        ) : (
          <div className="boards-container">
            {Object.values(cards).map((card) => (
              <Link key={card.id} to={`/cards/${card.id}`} className="board-link">
                <div className="board-card">
                  <h2 className="board-name">{card.title}</h2>
                  <p className="board-description">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default CardsTest;
