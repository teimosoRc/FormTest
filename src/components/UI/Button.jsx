import React from "react";

import styles from "./Button.module.css";

function Button(props) {
  let wtf;
  if (props.className === "back") {
    wtf = styles.back;
  }
  if (props.className === "next") {
    wtf = styles.next;
  }
  if (props.className === "start") {
    wtf = styles.start;
  }
  if (props.className === "add") {
    wtf = styles.add;
  }
  if (props.className === "succ") {
    wtf = styles.succ;
  }
  if (props.className === "err") {
    wtf = styles.err;
  }

  return (
    <button
      type={props.type}
      className={wtf}
      id={props.id}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
