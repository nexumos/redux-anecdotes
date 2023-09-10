const notificationReducer = (state = "Default Notification", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
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

export default notificationReducer;
