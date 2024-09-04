import React from 'react';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { STATES } from '../../constants/browser';

import styles from './styles.module.css';

const CattleBrowser = () => {
  return (
    <section className={styles.wrapper}>
      <Typography
        variant="body1"
        component="p"
        color="var(--fm-main-primary)"
        textTransform="uppercase"
        fontWeight={700}
      >
        Verified listings added daily
      </Typography>

      <Typography variant="h4" component="h2" fontWeight={700}>
        Thousands of Cattle to Browse
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.search_form}
      >
        <TextField
          id="search-cattle"
          label="What are you looking for?"
          type="search"
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'var(--fm-primary-white)',
              borderRadius: '0.38rem 0 0 0.38rem',
            },
          }}
          fullWidth
        />

        <Select
          labelId="search-cattle-by-state"
          id="search-cattle-by-state"
          label="All States"
          defaultValue={'All States'}
          className={styles.search_select}
          sx={{
            '& .MuiSelect-select': {
              backgroundColor: 'var(--fm-primary-white)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderLeftWidth: '0 !important',
              borderRightWidth: '0 !important',
            },
          }}
        >
          <MenuItem value={'All States'}>{'All States'}</MenuItem>
          {STATES.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          size="large"
          endIcon={<SearchIcon />}
          className={styles.search_button}
          type="submit"
        >
          Search
        </Button>
      </form>
    </section>
  );
};

export default CattleBrowser;
