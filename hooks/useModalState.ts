import { useState } from "react";

const useModalState = (
  initialOpen = false,
  initialTitle = "title",
  initialContentText = "Content",
  initialBtnActionText = "ActionName"
) => {
  const [show, setShow] = useState<boolean>(initialOpen);
  const [titleModal, setTitleModal] = useState<string>(initialTitle);
  const [textContentModal, setTextContentModal] = useState<string>(
    initialContentText
  );
  const [textBtnActionModal, setTextBtnActionModal] = useState<string>(
    initialBtnActionText
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return {
    handleClose,
    handleShow,
    show,
    titleModal,
    setTitleModal,
    textContentModal,
    setTextContentModal,
    textBtnActionModal,
    setTextBtnActionModal
  };
};

export default useModalState;
