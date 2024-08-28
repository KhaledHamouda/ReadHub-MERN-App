import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setOpenSearchDialog, fetchSearchResults } from '../Redux/DataSlice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SearchBar from '../components/homeComponents/SearchBar';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface BootstrapDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle: React.FC<BootstrapDialogTitleProps> = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const SearchDialog: React.FC = () => {
  const [value, setValue] = useState<'Books' | 'Categories' | 'Authors'>('Books');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpenSearchDialog(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as 'Books' | 'Categories' | 'Authors');
  };

  const handleSearch = () => {
    // dispatch(fetchSearchResults(`${value}:${searchQuery}`));
    handleClose();
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={true}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Search
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <FormControl component="fieldset">
          <FormLabel component="legend">Search In</FormLabel>
          <RadioGroup row value={value} onChange={handleChange}>
            <FormControlLabel value="Books" control={<Radio />} label="Books" />
            <FormControlLabel value="Categories" control={<Radio />} label="Categories" />
            <FormControlLabel value="Authors" control={<Radio />} label="Authors" />
          </RadioGroup>
        </FormControl>
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSearch}>Search</Button>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SearchBar;