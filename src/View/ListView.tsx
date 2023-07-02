import React from "react";
import List from "../components/List/List";

const ListView = () => {
  const DATA_LIST = {
    brand: "Apple",
    productName: "Iphone 13",
    price: "200000",
    launhDate: Date.now(),
  };
  const keys = [
    {
      name: "brand",
      id: "brand",
      label: "Brand Name",
    },
    {
      name: "productName",
      id: "productID",
    },
  ];
  const config = {
    dataListObject: DATA_LIST,
    keys,
    onlyValue: false,
  };
  return (
    <div>
      <List {...config} />
    </div>
  );
};

export default ListView;
