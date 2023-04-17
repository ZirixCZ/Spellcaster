export const generateLobbyCode = (): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomSequence = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomSequence += letters[randomIndex];
  }

  randomSequence += "-";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomSequence += letters[randomIndex];
  }

  return randomSequence;
};
