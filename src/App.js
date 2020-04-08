import React, { useState } from "react";
import { useForm } from "./useForm";
import { FormForMe } from "./components/my-form";

const App = () => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  // const [values2, handleChange2] = useForm({ firstName: "", lastName: "" });
  const [val, setVal] = useState(4);
  return (
    <div>
      <FormForMe></FormForMe>
      <>
        <button onClick={(e) => setVal(val + 1)}>+</button>
        <p>
          <button onClick={(e) => setVal(val - 1)}>-</button>
        </p>
        <h3>this is header 3 {val}</h3>
        <p>my paragraph</p>
        <h1>This is my first header</h1>
        <input name="email" value={values.email} onChange={handleChange} />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </>
    </div>
  );
};

export default App;
