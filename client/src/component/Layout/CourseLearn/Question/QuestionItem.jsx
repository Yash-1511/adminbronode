import React from 'react';
import { Box, Avatar, Badge, withStyles } from '@material-ui/core';
import { TimeAgo } from '../../../../commons/TimeAgo';
import ReplyIcon from '@material-ui/icons/Reply';
import DotMenu from '../DotMenu';
import style from './style';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../../../../redux/actions/QuestionAction';

const QuestionItem = ({
  isWidthUp,
  width,
  handleReply,
  item,
  userId,
  classes,
  handleAdd,
}) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    handleAdd(item);
  };

  const handleDelete = () => {
    // alert(JSON.stringify(item));
    const isDelete = confirm(
      `Bạn muốn xóa câu hỏi có tiêu đề là ${item.title}`
    );
    if (isDelete) {
      dispatch(deleteQuestion(item._id));
    }
  };

  return (
    <Box
      display="flex"
      borderColor="#dedfe0"
      borderBottom={1}
      py={2}
      px={3}
      mb={3}
    >
      <Box mr={2}>
        <Avatar src={item.user.photo} />
      </Box>
      <Box flexGrow={1} fontSize={14}>
        <Box fontWeight="bold">{item.title}</Box>
        {isWidthUp('md', width) && <Box mt={1}>{item.content}</Box>}
        <Box mt={1}>
          <Box display="inline" mr={1} color="primary.main">
            {userId === item.user._id
              ? 'tôi'
              : `${item.user.fristName} ${item.user.lastName}`}
          </Box>
          <Box display="inline" mr={1} color="primary.main">
            {item.lecture}
          </Box>
          <Box display="inline">{TimeAgo(item.createdAt)}</Box>
        </Box>
      </Box>
      <Box className={classes.reply} onClick={() => handleReply(item)}>
        <Badge badgeContent={item.reply.length} color="secondary">
          <ReplyIcon />
        </Badge>
      </Box>
      {item.user._id === userId ? (
        <DotMenu handleEdit={handleEdit} handleDelete={handleDelete} />
      ) : (
        <Box width={48} height={76} />
      )}
    </Box>
  );
};
export default withStyles(style)(QuestionItem);
