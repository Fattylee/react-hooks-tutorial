import React, { Fragment, useState, useEffect } from "react";
import Joi from "@hapi/joi";

// const initialValue = {
//   name: "",
//   age: "",
//   sex: "",
//   nameError: "",
//   ageError: "",
//   sexError: "",
// };
const FormForMe = () => {
  const [values, setValues] = useState({
    name: "",
    age: "",
    sex: "",
    nameError: "",
    ageError: "",
    sexError: "",
  });

  useEffect(() => {
    document.title = "useEffect page: " + values.name;
    // console.log("resetting...", values);
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const isValid = () => {
    // setValues((cState) => ({
    //   ...cState,
    //   nameError: "",
    //   ageError: "",
    //   sexError: "",
    // }));

    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .max(30)
        .lowercase()
        .required(),
      age: Joi.number()
        .max(150)
        .min(5)
        .required(),
      sex: Joi.string()
        .lowercase()
        .valid("male", "female")
        .required(),
    });
    const { name, sex, age } = values;
    const { value, error } = schema.validate(
      { name, sex, age },
      { abortEarly: false }
    );
    if (error) {
      const errorObj = {
        nameError: "",
        ageError: "",
        sexError: "",
      };
      const callbackfn = (e) => {
        errorObj[e.context.key + "Error"] = e.message;
      };
      error.details.map(callbackfn);
      console.log(errorObj);
      setValues({
        ...values,
        ...errorObj,
      });
      return false;
    }
    // let ageError = "",
    //   nameError = "",
    //   sexError = "";

    // const age = values.age.trim().toLowerCase();
    // const name = values.name.trim().toLowerCase();
    // const sex = values.sex.trim().toLowerCase();

    // if (age === "") {
    //   ageError = "age cannot be empty";
    // }
    // if (age.length > 0 && !Number(age)) {
    //   ageError = "not a valid age";
    // }
    // if (name === "") {
    //   nameError = "name cannot be empty";
    // }
    // if (sex === "") {
    //   sexError = "sex cannot be empty";
    // }
    // if (sex.length > 0 && sex !== "male" && sex !== "female") {
    //   sexError = 'invalid gender type ("male","female")';
    // }
    // if (nameError || ageError || sexError) {
    //   setValues((currentState) => ({
    //     ...currentState,
    //     nameError,
    //     ageError,
    //     sexError,
    //   }));
    //   return false;
    // }
    console.log(value);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const inputElements = Array.from(e.target.elements);
    if (isValid()) {
      // clearInput fields
      // inputElements.forEach((e) => {
      //   if (e.type !== "submit") {
      //     e.value = "";
      //   }
      // });
      console.log({
        name: values.name,
        age: values.age,
        sex: values.sex,
      });
      setValues({
        name: "",
        age: "",
        sex: "",
        nameError: "",
        ageError: "",
        sexError: "",
      });
    }
  };

  return (
    <Fragment>
      <h1>Freestylre move on</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="enter ur name"
          onChange={handleChange}
          value={values.name}
        />
        <div>{values.nameError}</div>
        <input
          type="text"
          name="sex"
          placeholder="enter ur gender"
          onChange={handleChange}
          value={values.sex}
        />
        <div>{values.sexError}</div>
        <input
          type="text"
          name="age"
          placeholder="enter ur age"
          onChange={handleChange}
          value={values.age}
        />
        <div>{values.ageError}</div>
        <input type="submit" value="submit h343" />
      </form>
      {/*
<p>Let test useState: {values.name}</p>
        */}
      {/*
      <p>Let test useState: {values.age}</p>
        */}
      {/*
      <p>Hurray my form lightup!</p>
        */}
      <ul>
        <li>name: {values.name}</li>
        <li>age: {values.age}</li>
        <li>sex: {values.sex}</li>
      </ul>
    </Fragment>
  );
};

export { FormForMe };
