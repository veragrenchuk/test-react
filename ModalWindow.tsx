import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, IconButton }  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from "../../styles/components/modalWindow.styles";

interface IModalWindowProps { 
  show: boolean;
  handleClose: () => void;
  modalTitle: string;
  modalTextBody: string;
  btnActionTitle: string;
  onAction: () => void;
}          

const ModalWindow: FC<IModalWindowProps> = (props) => {
  const { show = false, handleClose, modalTitle, modalTextBody, btnActionTitle, onAction } = props;
  const s = useStyles();
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      className={s.modalDialogWrapper}
    >
      <DialogTitle
        id="customized-dialog-title"
        disableTypography
        className={s.modalTitleWrapper}
      >
        <Typography variant="h5" component="h2">
          {modalTitle}
        </Typography>
        <IconButton onClick={handleClose} className={s.modalCloseBtn}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={s.modalContentWrapper}>
        <Typography gutterBottom className={s.modalBodyTextStyle}>
          {modalTextBody}
        </Typography>
      </DialogContent>
      <DialogActions className={s.modalActionWrapper}>
        <Button
          onClick={handleClose}
          className={`${s.modalBtnStyle} ${s.modalBtnCancel}`}
          size="large"
          variant="contained"
        >
          Close
        </Button>
        <Button
          onClick={onAction}
          className={`${s.modalBtnAction} ${s.modalBtnStyle}`}
          size="large"
          variant="contained"
        >
          {btnActionTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;