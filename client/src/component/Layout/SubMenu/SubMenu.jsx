import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {
  bindHover,
  bindMenu,
  usePopupState
} from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';
import { Link } from 'react-router-dom';
import React from 'react';

const submenuStyles = theme => ({
  menu: {
    top: theme.spacing(-1)
  },
  title: {
    flexGrow: 1
  },
  moreArrow: {
    marginRight: theme.spacing(-1)
  }
});

const ParentPopupState = React.createContext(null);

const Submenu = withStyles(submenuStyles)(
  React.forwardRef(
    ({ classes, title, popupId, children, slug, id, ...props }, ref) => {
      const parentPopupState = React.useContext(ParentPopupState);
      const popupState = usePopupState({
        popupId,
        variant: 'popover',
        parentPopupState
      });
      return (
        <ParentPopupState.Provider value={popupState}>
          <MenuItem
            {...bindHover(popupState)}
            selected={popupState.isOpen}
            ref={ref}
            component={Link}
            to={`/category/${slug}.${id}`}
          >
            <ListItemText className={classes.title}>{title}</ListItemText>
            <ChevronRight className={classes.moreArrow} />
          </MenuItem>
          <Menu
            {...bindMenu(popupState)}
            className={classes.menu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getContentAnchorEl={null}
            {...props}
          >
            {children}
          </Menu>
        </ParentPopupState.Provider>
      );
    }
  )
);

export default Submenu;
