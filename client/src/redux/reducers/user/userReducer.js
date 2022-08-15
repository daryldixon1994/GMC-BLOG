const initialState = {
    blogs: [],
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_USER_BLOGS":
            return {
                ...state,
                blogs: payload,
            };
        default:
            return state;
    }
};
export default userReducer;
