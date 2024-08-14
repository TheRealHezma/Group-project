import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewCard } from '../../redux/card';
import { useModal } from '../../context/Modal';

function NewCardModal({ listId, onCardCreated }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cardData = {
      title,
      description,
    };

    dispatch(createNewCard(listId, cardData))
      .then(() => {
        onCardCreated();
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <h1>New Card</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {errors.title && <p>{errors.title}</p>}
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors.description && <p>{errors.description}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCardModal;
