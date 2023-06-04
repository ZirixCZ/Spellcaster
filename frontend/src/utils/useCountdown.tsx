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
    if (roundsPlayed === null) return;

    if (word === null && role === Role.WORDSPELLER) return;

    const timer = setInterval(() => {
      if (countdown <= 0) return;
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [roundsPlayed, word, role]);

  React.useEffect(() => {
    setCountdown(offset);
  }, [roundsPlayed]);

  React.useEffect(() => {
    if (countdown === 0) {
    }
  }, [countdown]);

  return countdown;
};

export default useCountdown;
