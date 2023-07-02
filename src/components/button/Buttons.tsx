import React from "react";
import classes from "./Button.module.css";
const Buttons = ({
  children,
  onClick: callback,
}: {
  children: React.ReactNode;
  onClick: (e: any) => void;
}) => {
  const onClickHandler = (e: any) => {
    callback(e);
  };
  return (
    <button className={classes.button2} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Buttons;
