import * as React from "react";
import { Role } from "../../src/Global";

const useCountdown = (
  offset: number,
  roundsPlayed: number | null,
  word: string | null,
  role: Role | null
) => {
  const [countdown, setCountdown] = React.useState(offset);

  React.useEffect(() => {
    console.log("here");
    // deleted  || (!word && !roundsPlayed)
    if (roundsPlayed === null) return;

    console.log("here1");
    console.log(role);
    if (word === null && role === Role.WORDSPELLER) return;

    console.log("here2");
    const timer = setInterval(() => {
      console.log("here in the countdown hook");
      if (countdown <= 0) return;
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [roundsPlayed, word, role]);

  React.useEffect(() => {
    setCountdown(offset);
    console.log(roundsPlayed, "rounds played, useCountdown.tsx");
  }, [roundsPlayed]);

  React.useEffect(() => {
    if (countdown === 0) {
    }
  }, [countdown]);

  return countdown;
};

export default useCountdown;
