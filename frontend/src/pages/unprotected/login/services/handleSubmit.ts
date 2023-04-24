import { FormEvent } from "react";
import callApi from "../../../../utils/callApi";

const handleSubmit = async (
  e: FormEvent,
  userName: string | undefined,
  password: string | undefined
) => {
  e.preventDefault();
  if (!userName || !password) {
    return false;
  }

  const res = await callApi(
    "POST",
    "/api/user/login",
    JSON.stringify({
      userName: userName,
      password: password,
    })
  );

  if (!res.ok) {
    return false;
  }

  const json = await res.json();
  const token = json.jwt;

  if (!token) {
    return false;
  }

  localStorage.setItem("jwt", token);
  return true;
};

export default handleSubmit;
