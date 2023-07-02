import React, { ReactNode, useEffect, useReducer } from "react";
import { Button, Modal } from "semantic-ui-react";

type State = {
  open: boolean;
  dimmer?: string;
};

interface DialogProps {
  isDialogOpen?: "OPEN_MODAL" | "CLOSE_MODAL" | undefined;
  children: ReactNode | JSX.Element | string;
  isOpen: any;
  onClose: any;
  modalContenet: {
    title: string;
  };
}

type Action = { type: "OPEN_MODAL"; dimmer?: string } | { type: "CLOSE_MODAL" };

const exampleReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
};

const Dialog = ({
  isDialogOpen = "CLOSE_MODAL",
  children,
  modalContenet,
  onClose,
}: DialogProps) => {
  const { title } = modalContenet;
  const [state, dispatch] = useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  useEffect(() => {
    dispatch({ type: isDialogOpen });
  }, [isDialogOpen]);

  return (
    <div>
      <Modal dimmer={dimmer} open={open} onClose={onClose}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>{children}</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onClose}>
            Disagree
          </Button>
          <Button positive>OK</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Dialog;
