import React from 'react';
import {
  ExpansionPanelSummary,
  ExpansionPanel,
  Typography,
  ExpansionPanelDetails,
  withStyles,
  Grid,
  Box,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import style from './style';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { TotalDuration } from '../../../commons/TotalDuration';
import DialogCustom from '../DialogCustom';

const ExpansionPanels = (props) => {
  const { classes, content } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    if (expanded) document.querySelector(`.hide${expanded}`).style.display = '';
    setExpanded(isExpanded ? panel : false);
    if (expanded !== panel)
      document.querySelector(`.hide${panel}`).style.display = 'none';
  };

  return (
    <>
      {content.map((item, i) => (
        <ExpansionPanel
          square
          key={i}
          classes={{
            root: classes.rootExpansionPanel,
            expanded: classes.expanded,
          }}
          expanded={expanded === `panel${i}`}
          onChange={handleChange(`panel${i}`)}
        >
          <ExpansionPanelSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            classes={{
              root: classes.rootExpansionPanelSummary,
              expanded: classes.expanded,
              content: classes.contentExpansionPanelSummary,
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container>
              <Grid item xs={6}>
                <Box fontSize={15} fontWeight="fontWeightBold">
                  {item.title}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  className={`hidepanel${i}`}
                  textAlign="right"
                  fontSize={15}
                  color="text.secondary"
                >
                  {item.content.length} video
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box textAlign="right" fontSize={15} color="text.secondary">
                  {TotalDuration(
                    item.content.map((element) => element.duration)
                  )}
                </Box>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          {item.content.map((item, i) => (
            <ExpansionPanelDetails
              classes={{ root: classes.rootExpansionPanelDetails }}
              key={i}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Box fontSize={15} style={{ display: 'flex' }}>
                    <PlayArrowRoundedIcon fontSize="small" spacing={1} />
                    <Typography>{item.titleVideo}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  {item.isTry ? (
                    <DialogCustom
                      title={item.titleVideo}
                      button={
                        <Box
                          textAlign="right"
                          fontSize={15}
                          color="text.secondary"
                          style={{ cursor: 'pointer' }}
                        >
                          Xem trước
                        </Box>
                      }
                    />
                  ) : null}
                </Grid>
                <Grid item xs={3}>
                  <Box textAlign="right" fontSize={15} color="text.secondary">
                    {item.duration}
                  </Box>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          ))}
        </ExpansionPanel>
      ))}
    </>
  );
};

export default withStyles(style)(ExpansionPanels);
