import React, { useEffect, useState } from "react";
import { MyContextProvider, useMyContext } from "./store/CounterReducer";

import Neu from "./components/neumor/Neumorphism";
import UserTable from "./View/UserTable";
import Cards from "./components/Cards/Cards";
import "./App.scss";
import Dialog from "./components/Dialogbox/Dialog";
import { title } from "process";
import ListView from "./View/ListView";
type ModalState = "CLOSE_MODAL" | "OPEN_MODAL" | undefined;
const App: React.FC = () => {
  const [openModal, setOpenModal] = useState<ModalState>("CLOSE_MODAL");
  useEffect(() => {}, [openModal]);

  const openNewModal = () => {
    setOpenModal("OPEN_MODAL");
  };

  const closeModal = () => {
    setOpenModal("CLOSE_MODAL");
  };
  return (
    <MyContextProvider>
      <>
        <div className="home-header"></div>
        <div className="home-container">
          <div>
            <Neu
              header={{ label: "List Of users", align: "left" }}
              children={<UserTable />}
              height="auto"
            />
          </div>
          <div>
            <Cards title="Dashboard" children={<div>Test</div>} />
          </div>
          {/* ListView */}
          <div>
            <Cards title="Product List" children={<ListView /> || ""} />
          </div>
        </div>

        {/* <button
          onClick={() => {
            
            setOpenModal("OPEN_MODAL");
          }}
        >
          Modal
        </button> */}
        <Dialog
          isDialogOpen={openModal}
          isOpen={openNewModal}
          onClose={closeModal}
          modalContenet={{ title: "test" }}
        >
          <Cards title="Dashboard" children={<div>Test</div>} />
        </Dialog>
      </>
    </MyContextProvider>
  );
};

export default App;
