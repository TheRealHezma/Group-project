import { useState } from "react";
import { useDispatch } from "react-redux";
import { createListThunk } from "../../redux/list";
import { useModal } from '../../context/Modal';
import '../SignupFormModal/SignupForm.css';

const NewListForm = ({ boardId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();

        const listData = { name };
        const newList = await dispatch(createListThunk(listData, boardId));

        if (newList) {
          closeModal();
        } else {
          console.log('Did this break?')
        }
      };

      return (
        <div className="modal">
        <form onSubmit={handleSubmit} className="modal-content">
          <label>
            List Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create List</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
        </div>
      );
    };

    export default NewListForm;
