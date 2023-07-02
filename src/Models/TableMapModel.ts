export interface Columns {
  id: string;
  name: string;
}

export interface TableProps {
  data: any;
  columns: Columns[];
  checkBox?: boolean;
  onCheck?: any;
  tableLoading?: boolean;
  isFindEnable?: boolean;
  find?: (e: any) => void;
}
