import React from "react";
import { Header } from "semantic-ui-react";
import Gnb from "./Gnb";

const Top = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "100px 0 0" }}>
          <img
            src="/images/logo.jpg"
            alt="logo"
            style={{ display: "block", width: 80, borderRadius: "50%" }}
          />
        </div>
        <Header as="h1">LKHcoding</Header>
      </div>
      <Gnb />
    </div>
  );
};

export default Top;
