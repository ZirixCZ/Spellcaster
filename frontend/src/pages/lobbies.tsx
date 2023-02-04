import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import FormInput from "../components/FormInput";
import { Form, GTitleLeft } from "./register";
import Button from "../components/Button";
import callApi from "../utils/callApi";

const Lobbies = (): JSX.Element => {
  const newLobby = React.useRef<HTMLInputElement | null>(null);
  const [lobbies, setLobbies] = React.useState<any[] | null>(null);

  const navigate = useNavigate();

  // fetch lobbies
  React.useEffect(() => {
    callApi("GET", "/api/lobby", null).then((res) => {
      res.json().then((json) => {
        setLobbies(json);
      });
    });
  }, []);

  // create a new lobby
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callApi(
      "POST",
      "/api/lobby",
      JSON.stringify({
        name: newLobby.current?.value,
      })
    ).then(() => {
      navigate(`/lobbies/${newLobby.current?.value}`);
    });
  };

  return (
    <Container height={100}>
      <h1>Lobbies</h1>
      <StyledLobbies>
        {!lobbies ? (
          <></>
        ) : (
          lobbies.map((item, i) => {
            return (
              <div onClick={() => navigate(`/lobbies/${item.name ?? null}`)}>
                <div>{item.name ?? "error"}</div>
              </div>
            );
          })
        )}
      </StyledLobbies>
      <Form onSubmit={(e) => onFormSubmit(e)}>
        <GTitleLeft>CREATE A NEW LOBBY</GTitleLeft>
        <FormInput
          refer={newLobby}
          placeholder="think about a name..."
          type="text"
          pattern="^[a-z0-9_.]+$"
          errorMessage="email invalid"
        />
        <Button primary medium>
          Create
        </Button>
      </Form>
    </Container>
  );
};

const StyledLobbies = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Lobbies;
