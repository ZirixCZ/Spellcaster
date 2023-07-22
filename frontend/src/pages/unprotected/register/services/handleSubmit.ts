import * as React from "react";
import Swal from "sweetalert2";
import callApi from "../../../../utils/callApi";

const checkValidityRegex = (
  userName: string | undefined,
  email: string | undefined,
  password: string | undefined
) => {
  let validate;
  if (
    typeof userName === "string" &&
    typeof email === "string" &&
    typeof password === "string"
  ) {
    validate = [
      /^[a-zA-Z0-9]{3,16}$/.test(userName),
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      /^.{8,}$/.test(password),
    ];
  }

  if (typeof validate === "undefined") return validate;

  if (validate[0] && validate[1] && validate[2]) {
    return true;
  }

  return validate;
};

const handleSubmit = async (
  e: React.FormEvent,
  userName: string | undefined,
  email: string | undefined,
  password: string | undefined
) => {
  e.preventDefault();

  const handleValidation = checkValidityRegex(userName, email, password);
  if (typeof handleValidation !== "undefined" && handleValidation !== true) {
    Swal.fire({
      title: "Following fields were invalid",
      text: `${!handleValidation[0] ? "Username" : ""} ${
        !handleValidation[1] ? "Email" : ""
      } ${!handleValidation[2] ? "Password" : ""}`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }

  let success = await callApi(
    "POST",
    "/api/user/register",
    JSON.stringify({
      userName: userName,
      email: email,
      password: password,
    })
  ).then((res) => {
    if (!res.ok) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Make sure you already don't have an account.",
        icon: "error",
        confirmButtonText: "Try again",
      });

      return false;
    }
    return res.json().then((json) => {
      const token = json.jwt;
      if (!token) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Make sure you already don't have an account.",
          icon: "error",
          confirmButtonText: "Try again",
        });

        return false;
      }
      localStorage.setItem("jwt", json.jwt);
      console.log("it shouldb e ok : ( why is it not)");
      return true;
    });
  });

  return success.valueOf();
};

export default handleSubmit;
