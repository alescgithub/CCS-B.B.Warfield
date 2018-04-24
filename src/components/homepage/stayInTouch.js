import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./stayInTouch.css";

const Container = styled.div`
  text-align: center;
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
`;

const InputBox = styled.input`
  border-color: #c7c7c7;
  border-style: solid;
  height: 52px;
  width: 380px;
  text-align: center;

  &:placeholder-shown {
    font-style: italic;
  }
`;

const clearBox = context => {
  const inputEl = document.querySelector("input");
  inputEl.placeholder = " ";
  inputEl.style.borderColor = "#c7c7c7";
  inputEl.style.boxShadow = "";
};

const SubmitButton = styled.button`
  background-color: #54c5a6;
  height: 52px;
  color: white;
  text-transform: uppercase;
  padding: 0 30px;
  font-family: Open Sans Condensed, Arial, Helvetica, sans-serif;
  font-size: 18px;
  border: none;
  margin-left: 5px;

  &:focus {
    outline: 0;
  }
`;

const storeEmail = async () => {
  const inputEl = document.querySelector("input");
  if (!inputEl.validity.valid) {
    inputEl.style.border = "2px solid #e88c8c";
    inputEl.style.boxShadow = "0px 0px 4px #e88c8c";
  } else {
    const response = await postEmail(inputEl.value);
    console.log(response);
    if (response.ok) {
      toast.success("👍 Email subscribed!", {
        className: "react-toast-success react-toast-common"
      });
      inputEl.value = "ᕕ( ᐛ )ᕗ";
    } else {
      toast.error("💥 There was an error.", {
        className: "react-toast-error react-toast-common"
      });
    }
  }
};

const postEmail = email => {
  return fetch("/.netlify/functions/googleSheets");
};

const StayInTouch = () => (
  <Container>
    <p>
      Enter your email to signup for our regular newsletter. You’ll recieve
      updates like church announcements, bible studies, upcoming events, and fun
      things happening at Calvary Stockholm.
    </p>
    <ActionSection>
      <InputBox
        type="email"
        placeholder="alexandra@gmail.com"
        onFocus={clearBox}
      />
      <SubmitButton onClick={storeEmail}>Submit</SubmitButton>
    </ActionSection>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  </Container>
);

export default StayInTouch;
