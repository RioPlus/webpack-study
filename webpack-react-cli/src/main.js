import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// 引入antd样式
import "antd/dist/antd.less";

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);
