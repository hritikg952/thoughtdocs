const initialState = "";

const filterReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_FILTER":
      return payload.option;
    default:
      return state;
  }
};

export default filterReducer;
