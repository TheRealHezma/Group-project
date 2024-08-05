import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoardThunk } from "../../redux/board";
import { useModal } from "../../context/Modal";
import "./NewBoardModal.css";

function NewBoardModal() {
    const dispatch = useDispatch();
    const [boardName, setBoardName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set loading state to true

        const boardData = {
            name: boardName,
            description,
        };

        try {
            const serverResponse = await dispatch(createBoardThunk(boardData));
            if (serverResponse.errors) {
                setErrors(serverResponse.errors); // Adjust based on server response structure
            } else {
                closeModal(); // Close modal if creation is successful
            }
        } catch (error) {
            console.error("Error creating board:", error);
            setErrors({ general: "An unexpected error occurred. Please try again." });
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    };

    return (
        <div className="modal" onClick={handleBackgroundClick}>
            <div className="modal-content">
                <h1>Create New Board</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Board Name
                        <input
                            type="text"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                            required
                        />
                    </label>
                    {errors.name && <p>{errors.name}</p>}
                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {errors.description && <p>{errors.description}</p>}
                    {errors.general && <p>{errors.general}</p>}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewBoardModal;
