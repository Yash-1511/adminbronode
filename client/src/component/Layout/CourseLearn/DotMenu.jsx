import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const DotMenu = (props) => {
  const { handleEdit, handleDelete } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditQuestion = () => {
    handleClose();
    handleEdit();
  };

  const handleDeleteQuestion = () => {
    handleDelete();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEditQuestion}>Sửa</MenuItem>
        <MenuItem onClick={handleDeleteQuestion}>Xóa</MenuItem>
      </Menu>
    </>
  );
};

export default DotMenu;
