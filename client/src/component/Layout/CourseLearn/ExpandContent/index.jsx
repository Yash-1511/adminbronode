import {
  Box,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import style from './style';
import { useSelector, useDispatch } from 'react-redux';
import {
  addProccess,
  deleteProccess,
  updateAPIProccess,
} from '../../../../redux/actions/ProccessAction';

const ExpanContent = (props) => {
  const { classes, courseContent, changeVideo } = props;
  const [expanded, setExpanded] = React.useState('panel0');
  const [isActive, setIsActive] = React.useState([0, 0]);
  const [checked, setChecked] = React.useState(null);
  const proccess = useSelector((state) => state.proccess.proccesses);
  const paidId = useSelector((state) => state.proccess.paidId);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckBox = (event) => {
    const { name } = event.target;
    if (event.target.checked) {
      dispatch(addProccess(name));
    } else {
      dispatch(deleteProccess(name));
    }
  };

  const handlechangeVideo = (index) => {
    changeVideo(index);
    setIsActive(index);
  };

  React.useMemo(() => {
    if (proccess) {
      setChecked(proccess);
    }
  }, [proccess]);

  React.useEffect(() => {
    setChecked(proccess);
    window.addEventListener('beforeunload', handleClose);
    
    return () => {
      window.removeEventListener('beforeunload', handleClose);
      dispatch(updateAPIProccess(paidId));
    };
  }, []);

  const handleClose = (ev) => {
    ev.preventDefault();
    dispatch(updateAPIProccess(paidId));
    return (ev.returnValue = 'Are you sure you want to close?');
  };

  return courseContent.map((item, i) => (
    <ExpansionPanel
      expanded={expanded === `panel${i}`}
      onChange={handleChange(`panel${i}`)}
      key={i}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ root: classes.expansionSumary }}
      >
        <Box fontWeight="bold">
          Chương {i + 1}: {item.title}
        </Box>
      </ExpansionPanelSummary>
      {item.content.map((item, j) => (
        <ExpansionPanelDetails
          classes={{ root: classes.padding }}
          key={j}
          className={
            isActive[0] == i && isActive[1] === j ? classes.active : null
          }
        >
          <Box width="100%">
            <Checkbox
              name={item._id}
              checked={checked && checked[item._id] ? true : false}
              onChange={handleCheckBox}
            />
            <Box
              onClick={() => handlechangeVideo([i, j])}
              fontSize={14}
              display="inline"
              style={{ cursor: 'pointer' }}
            >
              Bài {j + 1}: {item.titleVideo}
              <Box fontSize={12} textAlign="end">
                {item.duration}
              </Box>
            </Box>
          </Box>
        </ExpansionPanelDetails>
      ))}
    </ExpansionPanel>
  ));
};

export default withStyles(style)(ExpanContent);
