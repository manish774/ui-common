import { MyState, MyAction, Props, useAttributes } from "../Models/Users";

export const UserReducer = (state: MyState, action: MyAction): MyState => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "ADDUSER":
      return { ...state, users: [...state.users, action.payload!] };
    default:
      return state;
  }
};
