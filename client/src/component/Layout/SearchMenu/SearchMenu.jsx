import { TextField, withStyles, withWidth } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { compose } from 'redux';
import styles from './styles';
import { search } from './search.js';
import { useHistory } from 'react-router-dom';

const SearchMenu = (props) => {
  const { classes } = props;
  const timeReq = React.useRef(null);
  const [options, setOptions] = React.useState([]);
  const history = useHistory();
  let noSearchAgain = false;

  const onInputChange = (e, newInput) => {
    if (timeReq.current) {
      clearTimeout(timeReq.current);
    }

    timeReq.current = setTimeout(async () => {
      if (newInput.length > 1 && !noSearchAgain) {
        setOptions(await search(newInput));
      } else {
        setOptions([]);
      }
    }, 300);
  };

  const onChange = (e, newValue) => {
    noSearchAgain = true;
    if (typeof newValue === 'string') {
      history.push(`/courses/search?q=${newValue}`);
    } else {
      const { slug, _id } = newValue;
      slug
        ? history.push(`/course/${slug}.${_id}`)
        : history.push(`/user/${_id}`);
    }
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      className={classes.inputInput}
      options={options}
      getOptionLabel={(options) => options.name}
      groupBy={(options) => options.groupBy}
      onInputChange={onInputChange}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: <SearchIcon />,
          }}
        />
      )}
    />
  );
};

export default compose(withStyles(styles), withWidth())(SearchMenu);
