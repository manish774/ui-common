import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../components/Table/MapTable";
import axios from "axios";
import { BulletList } from "react-content-loader";
import MapTable from "../components/Table/MapTable";
import { ModalState } from "../Models/Modal";
import Dialog from "../components/Dialogbox/Dialog";
import Buttons from "../components/button/Buttons";
interface UserAttributes {
  id: string;
  type: string;
}
interface UserProps {
  data: UserAttributes[];
}
const UserTable = () => {
  const [users, setUsers] = useState<UserAttributes[]>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openModal, setOpenModal] = useState<ModalState>("CLOSE_MODAL");

  const openNewModal = () => {
    setOpenModal("OPEN_MODAL");
  };

  const closeModal = () => {
    setOpenModal("CLOSE_MODAL");
  };
  useEffect(() => {
    axios
      .get("https://api.github.com/events")
      .then((response: any) => {
        const onlyTenUser = response.data.slice(0, 10);
        setUsers(onlyTenUser);
        console.log(users);
      })
      .catch((error: any) => {})
      .finally(function () {
        setLoading(false);
      });
  }, [isLoading]);

  const columns = [
    {
      name: "id",
      id: "id",
    },
    {
      name: "type",
      id: "type",
    },
  ];
  const records = useCallback(() => {
    return Promise.resolve({
      records: users || [],
      totalCount: users?.length || 0,
    });
  }, [isLoading]);

  const checkBoxClicked = (selecedArr: any) => {
    setSelectedUsers(selecedArr);
  };

  useEffect(() => {}, [selectedUsers]);
  const searchInTable = (e: any) => {
    const { records, text } = e;
    const filteredRecords = records.filter((rec: any) =>
      rec?.name?.includes(e)
    );
    const rec = Promise.resolve({
      records: filteredRecords || [],
      totalCount: filteredRecords?.length || 0,
    });
  };
  const config = useMemo(() => {
    return {
      data: records,
      columns: columns,
      checkBox: true,
      onCheck: checkBoxClicked,
      find: searchInTable,
    };
  }, [users, columns, checkBoxClicked]);

  const configSkeleton = useMemo(() => {
    return {
      data: records,
      columns: columns,
      checkBox: true,
      tableLoading: true,
    };
  }, [users, columns, checkBoxClicked]);

  const selectedUsersOnly = () => {
    return Promise.resolve({
      records: selectedUsers || [],
      totalCount: selectedUsers?.length || 0,
    });
  };

  const configDetails = useMemo(() => {
    return {
      data: selectedUsersOnly,
      columns: [...columns, { name: "created_at", id: "created_at" }],
      isFindEnable: false,
    };
  }, [users, openModal, columns, checkBoxClicked]);

  return (
    <>
      {users?.length ? (
        <MapTable {...config} />
      ) : (
        <MapTable {...configSkeleton} />
      )}
      {selectedUsers?.length ? (
        <Buttons
          onClick={() => {
            openNewModal();
          }}
        >
          Show selected
        </Buttons>
      ) : (
        ""
      )}
      {selectedUsers?.length ? (
        <Dialog
          isDialogOpen={openModal}
          isOpen={openNewModal}
          onClose={closeModal}
          modalContenet={{ title: "test" }}
        >
          <MapTable {...configDetails} />
        </Dialog>
      ) : (
        ""
      )}
    </>
  );
};

export default UserTable;
