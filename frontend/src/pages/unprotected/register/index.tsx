import * as React from "react";
import Swal from "sweetalert2";
import styled, { css } from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Paragraph from "../../../components/Paragraph";
import { mobile, tablet } from "../../../Global";
import handleSubmit from "./services/handleSubmit";

const Register = (): JSX.Element => {
  const navigate = useNavigate();

  const userNameRef = React.useRef<HTMLInputElement | null>(null);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState<Promise<boolean>>();

  React.useEffect(() => {
    if (typeof submitSuccess !== "undefined")
      submitSuccess.then((result) => {
        if (!result) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Make sure you already don't have an account.",
            icon: "error",
            confirmButtonText: "Try again",
          });
          return;
        }

        navigate("/");
      });
  }, [submitSuccess]);

  return (
    <Container height={100} justifyContent="center">
      <StyledContainer paddingTop={0} alignItems="start" paddingTopTablet={2}>
        <Title>Sign up</Title>
      </StyledContainer>
      <Form
        onSubmit={(e) =>
          setSubmitSuccess(
            handleSubmit(
              e,
              userNameRef?.current?.value,
              emailRef?.current?.value,
              passwordRef?.current?.value
            )
          )
        }
      >
        <GTitleLeft>ACCOUNT INFORMATION</GTitleLeft>
        <FormInput
          refer={userNameRef}
          placeholder="a-z0-9_."
          type="text"
          pattern="^[a-z0-9_.]+$"
          errorMessage="username invalid"
          autoComplete="username"
        />
        <FormInput
          refer={emailRef}
          placeholder="example@example.com"
          type="email"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          errorMessage="email invalid"
        />
        <FormInput
          refer={passwordRef}
          placeholder="letter, number, min 8 characters"
          type="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          errorMessage="password invalid"
          isLast={true}
        />
        <Paragraph size={1} weight={500}>
          <Link to="/login">I have an account</Link>
        </Paragraph>
        <Button primary medium>
          Create an account
        </Button>
      </Form>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 4em;
`;

const StyledContainer = styled(Container)`
  text-align: start;
  width: 25%;

  ${tablet(css`
    width: 50%;
  `)}

  ${mobile(css`
    width: 75%;
  `)}
`;

export const GTitleLeft = styled.p`
  width: 100%;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: left;
`;

export const InputDescription = styled(GTitleLeft)<{ hasNoPadding?: boolean }>`
  margin: 0;
  padding-top: 0.5rem;
  padding-bottom: 1.25rem;
  ${(props) => props.hasNoPadding && "padding-bottom: 0;"};
`;

export const Form = styled.form`
  width: 25%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${tablet(css`
    width: 50%;
  `)}

  ${mobile(css`
    width: 75%;
    margin-bottom: 5rem;
  `)}
`;
export default Register;
