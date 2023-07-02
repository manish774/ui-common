export interface KeyProps {
  name: string;
  id: string;
  label?: string;
}
export interface ListProps {
  keys?: KeyProps[];
  themeSyle?: "NORMAL" | "TABLE" | "DARK" | "DEFAULT";
  dataListObject: any;
  onlyValue?: boolean;
}
