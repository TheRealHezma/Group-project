import { useState } from "react";
import { useDispatch } from "react-redux";
import { editListById } from "../../redux/list";
import { useModal } from '../../context/Modal';

const EditListForm = ({ listId, currentName }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState(currentName);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = { name };
        const updatedList = await dispatch(editListById(listId, updatedData));

        if (updatedList) {
          closeModal();
        } else {
          console.log('HELP I AM BROKEN!!!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <label>
            List Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
    );
};

export default EditListForm;
