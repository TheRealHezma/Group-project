//*VARIABLE TYPES
const GET_COMMENTS_BY_CARD = 'comments/GET_BY_CARD';
const GET_COMMENT_BY_ID = 'comments/GET_BY_ID';
const CREATE_COMMENT = 'comments/CREATE';
const EDIT_COMMENT = 'comments/EDIT';
const DELETE_COMMENT = 'comments/DELETE';


//*ACTIONS

// Get all comments by card id
const getCommentsByCardId = (cardId, comments) => ({
    type: GET_COMMENTS_BY_CARD,
    cardId,
    comments,
});

// Get comment by id
const getCommentById = (comment) => ({
    type: GET_COMMENT_BY_ID,
    comment,
});

// Create a comment
const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment,
});

// Edit a comment
const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment,
});

// Delete a comment
const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId,
});


//*THUNKS

// Get all comments by card id
export const getAllComments = (cardId) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/comments`);
    if (response.ok) {
        const comments = await response.json();
        if (typeof comments === 'object' && !Array.isArray(comments)) {
            dispatch(getCommentsByCardId(cardId, comments));
        } else {
            console.error('Expected comments to be an object:', comments);
        }
    } else {
        console.error('Failed to fetch comments:', response.statusText);
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
    allCommentsByCard: {},  // { cardId: { commentId: comment } }
    currentComment: null,
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_BY_CARD: {
            const { cardId, comments } = action;

            // Ensure comments is an object with a Comments array
            if (comments && typeof comments === 'object' && Array.isArray(comments.Comments)) {
                const normalizedComments = {};
                comments.Comments.forEach(comment => {
                    normalizedComments[comment.id] = comment;
                });

                return {
                    ...state,
                    allCommentsByCard: {
                        ...state.allCommentsByCard,
                        [cardId]: normalizedComments,
                    },
                };
            } else {
                console.error('Expected comments to be an object with a Comments array:', comments);
                return state;
            }
        }
        case GET_COMMENT_BY_ID: {
            return {
                ...state,
                currentComment: action.comment,
            };
        }
        case CREATE_COMMENT: {
            const { comment } = action;
            const { card_id } = comment;

            return {
                ...state,
                allCommentsByCard: {
                    ...state.allCommentsByCard,
                    [card_id]: {
                        ...state.allCommentsByCard[card_id],
                        [comment.id]: comment,
                    },
                },
            };
        }
        case EDIT_COMMENT: {
            const { comment } = action;
            console.log("Comment:", comment);
            const { card_id } = comment;
            console.log('Card Id:', card_id)
            return {
                ...state,
                allCommentsByCard: {
                    ...state.allCommentsByCard,
                    [card_id]: {
                        ...state.allCommentsByCard[card_id],
                        [comment.id]: comment,
                    },
                },
            };
        }
        case DELETE_COMMENT: {
            const { commentId } = action;
            const updatedCommentsByCard = { ...state.allCommentsByCard };

            for (const cardId in updatedCommentsByCard) {
                const cardComments = { ...updatedCommentsByCard[cardId] };
                delete cardComments[commentId];
                if (Object.keys(cardComments).length > 0) {
                    updatedCommentsByCard[cardId] = cardComments;
                } else {
                    delete updatedCommentsByCard[cardId];
                }
            }

            return {
                ...state,
                allCommentsByCard: updatedCommentsByCard,
                currentComment: state.currentComment?.id === commentId ? null : state.currentComment,
            };
        }
        default:
            return state;
    }
};

export default commentsReducer;
