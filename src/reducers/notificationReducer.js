const notificationReducer = (state = "Notification Area", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const notificationChange = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    payload: notification,
  };
};

export const notificationClear = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

export default notificationReducer;
