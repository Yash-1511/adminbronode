import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import style from './style';
import { DialogContent, Box } from '@material-ui/core';

const index = (props) => {
  const { classes, title, content, button } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const OpenDialog = {
    ...button,
    props: { ...button.props, onClick: handleClickOpen },
  };

  return (
    <>
      {OpenDialog}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="sm"
        fullWidth
        open={open}
      >
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6" noWrap style={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            id='close-dialog'
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          {content ? content : 'Chưa có dữ liệu'}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(style)(index);
