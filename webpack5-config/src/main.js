import "./aa.js";
import $ from "jquery";
import "./css/base.css";
import "./css/index.css";
import "./less/header.less";
console.log("哈喽。我说main.js");

$(function () {
  console.log("今日");
  $("#app li:nth-child(odd)").css("color", "red");
  $("#app li:nth-child(even)").css("color", "green");
});

const myfn = () => {
  console.log("我是新语法箭头函数");
};
myfn();
