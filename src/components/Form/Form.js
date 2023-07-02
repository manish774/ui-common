import React from "react";

const Form = (props) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
  };
  return <form onSubmit={onFormSubmit}>{props.children}</form>;
};

export default Form;
