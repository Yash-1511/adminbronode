import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { fetchCategories } from '../../../redux/actions/CategoryAction';
import Submenu from '../SubMenu/SubMenu.jsx';
import styles from './styles';
import { Link } from 'react-router-dom';

const ParentPopupState = React.createContext(null);
const renderCategory = (category, popupState) =>
category&&category.map((item) =>
    item.topics.length > 0 ? (
      <Submenu
        popupId="moreChoicesMenu"
        key={item._id}
        id={item._id}
        title={item.title}
        slug={item.slug}
      >
        {item.topics.map((item, i) => (
          <MenuItem
            onClick={popupState.close}
            key={i}
            component={Link}
            to={`/topic/${item.slug}.${item._id}`}
          >
            {item.title}
          </MenuItem>
        ))}
      </Submenu>
    ) : (
      <MenuItem
        onClick={popupState.close}
        key={item._id}
        component={Link}
        to={`/category/${item.slug}.${item._id}`}
      >
        {item.title}
      </MenuItem>
    )
  );

const NestedMenu = (props) => {
  const { classes } = props;
  const popupState = usePopupState({ popupId: 'demoMenu', variant: 'popover' });
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);

  React.useEffect(() => {
    if (category.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  return (
    <div className={classes.textCate}>
      <Typography {...bindHover(popupState)}>Danh mục</Typography>
      <ParentPopupState.Provider value={popupState}>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          getContentAnchorEl={null}
        >
          {renderCategory(category, popupState)}
        </Menu>
      </ParentPopupState.Provider>
    </div>
  );
};

export default compose(withStyles(styles))(NestedMenu);
