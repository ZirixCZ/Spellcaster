import * as React from "react";
import {useNavigate} from "react-router-dom";
import styled, {css} from "styled-components";
import Container from "../components/Container";
import FormInput from "../components/FormInput";
import {Form, GTitleLeft} from "./unprotected/register";
import Button from "../components/Button";
import callApi from "../utils/callApi";
import {tablet, mobile} from "../Global";
import Theme from "../components/Theme";
import {motion} from "framer-motion";


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

    const container = {
        hidden: {opacity: 1, scale: 0},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const motionItem = {
        hidden: {y: 10},
        visible: {
            y: 0,
        },
    };

    return (
        <Container heightKeyword="fit-content" width={100}>
            <StyledLobbies
                variants={container}
                initial="hidden"
                animate="visible">
                {!lobbies ? (
                    <></>
                ) : (
                    lobbies.map((item, i) => {
                        return (
                            <Lobby variants={motionItem} whileHover={{
                                scale: 1.2,
                                transition: {duration: 0.25},
                            }}
                                   whileTap={{scale: 0.9}}
                                   onClick={() => navigate(`/lobbies/${item.name ?? null}`)}
                            >
                                <Text>{item.name ?? "error"}</Text>
                                <Text>1/9</Text>
                            </Lobby>
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
                <Button secondary medium>
                    Create
                </Button>
            </Form>
        </Container>
    );
};

const StyledLobbies = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: space-between;
  align-items: flex-start;
  width: 25%;
  margin-bottom: 5em;
  ${tablet(css`
    width: 50%;
  `)}
  ${mobile(css`
    justify-content: center;
  `)}
`;

const ButtonWrapper = styled.div`
  width: 25%;
  ${tablet(css`
    width: 50%;
  `)}
  margin: 5em;
`;

const Lobby = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 7em;
  height: 7em;
  border-radius: 15px;
  background: rgb(105,245,231);
  background: linear-gradient(180deg, rgba(105,245,231,1) 0%, rgba(0,219,197,1) 100%);
  color: white;
  cursor: pointer;
  z-index: 1;
  position: relative;
  transition: 0.3s;

  &:hover {
    background: rgb(105,245,231);
    background: linear-gradient(180deg, rgba(105,245,231,1) 0%, rgba(105,245,231,1) 100%);
  }
`;

const Text = styled.p`
  width: 75%;
  margin: 0;
  height: fit-content;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export default Lobbies;
