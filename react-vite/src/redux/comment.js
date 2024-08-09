//*VARIABLE TYPES
const GET = 'comments/LOAD'
const GET_BY_ID = 'comments/LOADONE';
const CREATE = 'comments/CREATE';
const EDIT = 'comments/EDIT'
const DELETE = 'comments/DELETE'

//*ACTIONS

// Get all comments by card id
const getCommentsByCardId = (cardId, comments) => ({
    type: GET,
    cardId,
    comments
});

// Get comment by id
const getCommentById = (commentId) => ({
    type: GET_BY_ID,
    commentId,
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
    // console.log('request received')
    const response = await fetch(`/api/cards/${cardId}/comments`);
    // if (response.ok) {
    const comments = await response.json();
    dispatch(getCommentsByCardId(cardId, comments));
    // }
};

// Get a comment by id
export const getComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`);
    // if (response.ok) {
    const comment = await response.json();
    console.log(comment)
    dispatch(getCommentById(comment));
    // }
};

// Create a comment
export const createNewComment = (cardId, payload) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const newComment = await response.json();
        dispatch(createComment(newComment));
        return newComment;
    }
};

// Edit a comment
export const updateComment = (commentId, content) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
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
    allCommentsByCard: {}, currentComment: null,
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET: {
            const { cardId, comments } = action;

            return {
                ...state,
                allCardComments: {
                    ...state.allCardComments,
                    [cardId]: comments,
                },
            };
        }
        case GET_BY_ID: {
            const currentComment = action.comment
            return { ...state, currentComment: currentComment };
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
            const updatedComment = action.comment
            return {
                ...state,
                allComments: {
                    ...state.allComments,
                    [updatedComment.id]: updatedComment,
                },
            };
        }
        case DELETE: {
            const newState = { ...state.allComments };
            delete newState[action.commentId];
            return {
                ...state,
                allComments: newState,
                currentComment: state.currentComment.id === action.commentId ? {} : state.currentComment
            };
        }
        default:
            return state;
    }
};

export default commentsReducer;
