export interface useAttributes {
  name: string;
  age: number;
}
export interface MyState {
  count: number;
  users: useAttributes[];
}

export interface Props {
  children: React.ReactElement;
}

export type MyAction =
  | { type: "ADDUSER"; payload?: useAttributes }
  | { type: "INCREMENT"; payload?: number }
  | { type: "DECREMENT"; payload?: number };

// export { useAttributes, MyState, Props, MyAction };
