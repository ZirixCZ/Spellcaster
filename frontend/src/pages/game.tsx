import * as React from "react";
import getLobbyFromURL from "../utils/getLobbyFromURL";
import { useLocation } from "react-router-dom";

export default (): JSX.Element => {
  const [title, setTitle] = React.useState<string | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    setTitle(getLobbyFromURL(location.pathname));
  }, []);

  // TODO: fetch information about lobby depending on name
  React.useEffect(() => {
    if (!title) return;
    return
  }, [title]);

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
