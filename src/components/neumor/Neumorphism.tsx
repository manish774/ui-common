import React, { CSSProperties } from "react";
import classes from "./Neumorphism.module.css";

interface Props {
  header?: any;
  width?: string;
  height?: string;
  children: React.ReactNode;
}
const Neu = ({ header, width, height, children }: Props) => {
  return (
    <div
      className={classes.div}
      style={{
        padding: "20px",
        width: width,
        height: height,
        margin: "10px",
      }}
    >
      <p
        style={{
          textAlign: header.align || "center",
          fontSize: "20px",
          fontWeight: "bolder",
          height: "100%",
        }}
      >
        {header ? header.label : ""}
      </p>
      {children}
    </div>
  );
};

export default Neu;
