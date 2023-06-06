import * as React from "react";

const calculateRoundCount = (
  userInput: number | null,
  connectedUsers: number | null
) => {
  if (!userInput || !connectedUsers) return 1;

  return userInput * connectedUsers;
};

export default calculateRoundCount;
