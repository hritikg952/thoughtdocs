const initialState = {
  name: "",
  lastname: "",
  email: "",
  role: "",
  id: "",
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SIGN_IN":
      return {
        name: payload.name,
        lastname: payload.lastname,
        email: payload.email,
        role: payload.role,
        id: payload.id,
      };

    case "SIGN_OUT":
      return {
        name: "",
        lastname: "",
        email: "",
        role: "",
        id: "",
      };

    case "UPDATE_USER":
      return {
        ...state,
        name: payload.name,
        lastname: payload.lastname,
        email: payload.email,
        role: payload.role,
        id: payload.id,
      };

    default:
      return state;
  }
};

export default userReducer;
