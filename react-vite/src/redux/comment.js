//*VARIABLE TYPES
const GET = 'comments/LOAD'
const GET_BY_ID = 'comments/LOADONE';
const CREATE = 'comments/CREATE';
const EDIT = 'comments/EDIT'
const DELETE = 'comments/DELETE'

//*ACTIONS

// Get all comments
const getComments = (comments) => ({
    type: GET,
    comments,
});

// Get comment by id
const getCommentById = (comment) => ({
    type: GET_BY_ID,
    comment,
});

// Create a comment
const createComment = (comment) => ({
    type: CREATE,
    comment,
});

// Edit a comment
const editComment = (comment) => ({
    type: EDIT,
    comment,
});

// Delete a comment
const deleteComment = (commentId) => ({
    type: DELETE,
    commentId,
});


//*THUNKS


// Get all comments by card id
export const getAllComments = (cardId) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/comments`);
    if (response.ok) {
        const allComments = await response.json();
        dispatch(getComments(allComments.Comments));
    }
};

// Get a comment by id
export const getComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`);
    if (response.ok) {
        const comment = await response.json();
        dispatch(getCommentById(comment));
    }
};

// Create a comment
export const createNewComment = (cardId, content) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    if (response.ok) {
        const newComment = await response.json();
        dispatch(createComment(newComment));
    }
};

// Edit a comment
export const updateComment = (commentId, content) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(editComment(updatedComment));
    }
};

// Delete a comment
export const removeComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteComment(commentId));
    }
};


//*INITIAL STATE + REDUCER

const initialState = {
    allComments: {}, currentComment: null,
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET: {
            const allComments = {};
            action.comments.forEach(comment => {
                allComments[comment.id] = comment;
            });
            return { ...state, allComments };
        }
        case GET_BY_ID: {
            return { ...state, currentComment: action.comment };
        }
        case CREATE: {
            return {
                ...state,
                allComments: {
                    ...state.allComments,
                    [action.comment.id]: action.comment,
                },
            };
        }
        case EDIT: {
            return {
                ...state,
                allComments: {
                    ...state.allComments,
                    [action.comment.id]: action.comment,
                },
            };
        }
        case DELETE: {
            const newState = { ...state };
            delete newState.allComments[action.commentId];
            return newState;
        }
        default:
            return state;
    }
};

export default commentsReducer;
