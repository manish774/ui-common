import React, { useEffect, useState } from "react";
import { ListProps } from "../../Models/ListModel";
import "./List.scss";

const List = ({
  keys = [],
  dataListObject,
  themeSyle = "DEFAULT",
  onlyValue = false,
}: ListProps) => {
  const [newList, setNewList] = useState<any>();

  useEffect(() => {
    prepareList();
  }, []);

  const prepareList = () => {
    const flatKeyArray = Object.keys(dataListObject);
    const keysAttributes = keys?.map((k) => k.name) || [];
    const labels: any = {};

    keys.forEach((k) => {
      labels[k?.name] = k?.label || k?.name;
    });

    const keysToPrint = () => {
      if (!keysAttributes.length) {
        return flatKeyArray.map((k: any) => <li>{dataListObject[k]}</li>);
      }
      return keysAttributes.map((k: any) => {
        if (flatKeyArray.includes(k)) {
          return onlyValue ? (
            <li key={k}>{dataListObject[k]}</li>
          ) : (
            <li key={k}>{`${labels[k]} : ${dataListObject[k]}`}</li>
          );
        }
      });
    };

    console.log(keysToPrint());
    setNewList(keysToPrint());
  };
  return (
    <div>
      <ul className="listcontainer">{newList}</ul>
    </div>
  );
};

export default List;
