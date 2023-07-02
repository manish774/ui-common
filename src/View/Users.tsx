import React, { useEffect } from "react";
import { useMyContext } from "../store/CounterReducer";
import Form from "../components/Form/Form";
import Neumorphism from "../components/neumor/Neumorphism";
import Buttons from "../components/button/Buttons";

const Users: React.FC = () => {
  const { state, dispatch } = useMyContext();
  const { users } = state;
  const increment = (e: any) => {
    dispatch({
      type: "ADDUSER",
      payload: { name: Date.now().toString(), age: 1 },
    });
    dispatch({ type: "INCREMENT" });
  };

  const decrement = (e: any) => {
    dispatch({ type: "DECREMENT" });
  };

  useEffect(() => {}, [users]);

  return (
    <div>
      <Form>
        <Neumorphism header={{ align: "left" }}>
          <p>Count: {state.count}</p>
          <Buttons onClick={increment}>Increment</Buttons>
          <Buttons onClick={decrement}>Decrement</Buttons>
          {users.map((u) => (
            <div key={u.name}>
              name: {u.name} age: {u.age}
            </div>
          ))}
        </Neumorphism>
      </Form>
    </div>
  );
};
export default Users;
