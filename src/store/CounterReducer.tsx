import React, { createContext, useReducer } from "react";
import { MyState, MyAction, Props } from "../Models/Users";
import { UserReducer } from "../Reducres/UsersReducrer";
const initialState: MyState = {
  count: 0,
  users: [],
};

const MyContext = createContext<{
  state: MyState;
  dispatch: React.Dispatch<MyAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useMyContext = () => React.useContext(MyContext);

export const MyContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};
