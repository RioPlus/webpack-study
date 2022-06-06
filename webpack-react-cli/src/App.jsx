import React, { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";

import { Button } from "antd";

// 路由懒加载
const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/Home"));
const About = lazy(() =>
  import(/* webpackChunkName: 'about' */ "./pages/About")
);

export default function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Button type="primary">按钮</Button>
      <Suspense fallback={<div>加载中·</div>}>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
