import React, { useCallback, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../Utils";
import "./TableMap.scss";
import { Table } from "semantic-ui-react";
import ContentLoader, { Code } from "react-content-loader";

import { TableProps } from "../../Models/TableMapModel";

const MapTable = ({
  data,
  columns,
  checkBox = false,
  onCheck,
  tableLoading = false,
  isFindEnable = true,
  find,
}: TableProps) => {
  const [tableData, setTableData] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    data().then(({ records, totalCount }: any) => {
      setTotalCount(totalCount);
      const addCheckBoxToData =
        records?.map((d: any) => {
          return { ...d, checked: d.checked || false };
        }) || [];
      setTableData(addCheckBoxToData);
    });
  }, [data]);

  const selectAll = useCallback(
    (e: any) => {
      const addCheckBoxToData =
        tableData?.map((d: any) => {
          return { ...d, checked: e.target.checked };
        }) || [];
      setTableData(addCheckBoxToData);
      onCheck(addCheckBoxToData.filter((d: any) => d.checked === true));
    },
    [tableData, onCheck]
  );

  const handleCheck = useCallback(
    (val: any) => {
      const checkRow = tableData.map((item: any) => {
        if (item[columns[0]?.name] === val?.target?.value) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      setTableData(checkRow);
      const selectedData = checkRow.filter((row: any) => row.checked === true);
      onCheck && onCheck(selectedData);
    },
    [tableData, columns, onCheck]
  );

  const prepareTableCoulmns = () => {
    const renderCheckboxColumn = () => {
      if (checkBox) {
        return (
          <th>
            <input type="checkbox" onChange={selectAll} />
          </th>
        );
      }
      return null;
    };

    const renderHeaderCells = () => {
      return columns.map((d) => (
        <Table.HeaderCell key={d.name}>
          {capitalizeFirstLetter(d.name)}
        </Table.HeaderCell>
      ));
    };

    return (
      <>
        {renderCheckboxColumn()}
        {renderHeaderCells()}
      </>
    );
  };

  const prepareTableData = () => {
    const columnArrays = columns.map((cols) => cols.name);
    const dataCoulmns = Object.keys(tableData[0]);
    debugger;
    return tableData.map((d: any) => {
      return (
        <Table.Row key={d.name}>
          {checkBox && (
            <Table.Cell>
              <input
                type="checkbox"
                onChange={handleCheck}
                value={d[columns[0].name]}
                checked={d.checked}
              />
            </Table.Cell>
          )}
          {dataCoulmns.map((dc) => {
            if (columnArrays.includes(dc)) {
              return <Table.Cell key={d[dc]}>{d[dc]}</Table.Cell>;
            }
          })}
        </Table.Row>
      );
    });
  };

  const prepareSkeletoneData = () => {
    return [11, 22, 33, 44].map((d: any) => {
      return (
        <Table.Row key={d.name}>
          {checkBox && (
            <Table.Cell>
              <input
                type="checkbox"
                onChange={handleCheck}
                value={d[columns[0].name]}
                checked={d.checked}
                disabled
              />
            </Table.Cell>
          )}
          {[1, 2].map((dc) => {
            return (
              <Table.Cell key={dc}>
                <ContentLoader
                  height={10}
                  speed={1}
                  backgroundColor={"#ccc"}
                  foregroundColor={"#999"}
                >
                  <rect x="0" y="0" rx="4" ry="4" width="30" height="5" />
                </ContentLoader>
              </Table.Cell>
            );
          })}
        </Table.Row>
      );
    });
  };

  const loadingContent = () => {
    return (
      <>
        <Table.Header>
          <Table.Row>{prepareTableCoulmns()}</Table.Row>
        </Table.Header>
        <Table.Body>{prepareSkeletoneData()}</Table.Body>
      </>
    );
  };

  const tableHeaderContent = () => {
    return (
      <>
        <Table.Header>
          <Table.Row>{prepareTableCoulmns()}</Table.Row>
        </Table.Header>
        <Table.Body>{prepareTableData()}</Table.Body>
      </>
    );
  };

  const emtyTableContent = () => {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>No Item available</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  };

  const onInputHandler = (e: any) => {
    if (isFindEnable && typeof find === "function") {
      find({ records: tableData, findText: e.target.value });
    }
  };
  return (
    <div className="table-map-container">
      <div>
        Total Count: {totalCount}
        {isFindEnable && (
          <input className="search-box" onInput={onInputHandler} />
        )}
      </div>
      <Table celled>
        {tableLoading
          ? loadingContent()
          : tableData.length
          ? tableHeaderContent()
          : emtyTableContent()}
      </Table>
    </div>
  );
};

export default MapTable;
