import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDialog, setOpenSearchDialog } from '../Redux/DataSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SearchBar from '../components/homeComponents/SearchBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// Define the shape of your Redux state
interface RootState {
  DataReducer: {
    loginState: boolean;
  };
}

// Define props for MsgDialogs component
interface MsgDialogsProps {
  title: string;
  msg: string;
  state: number;
  navigation?: number;
}

// Styled components
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

export const MsgDialogs: React.FC<MsgDialogsProps> = ({ title, msg, state, navigation }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    dispatch(setOpenDialog(false));
    if (navigation === 1) {
      navigate('/');
    }
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom sx={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>
          {state === 1 ? (
            <CheckCircleIcon sx={{ color: 'green', fontSize: '30px', marginRight: '8px' }} />
          ) : (
            <ErrorIcon sx={{ color: 'red', fontSize: '30px', marginRight: '8px' }} />
          )}
          {msg}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export const SearchDialog: React.FC = () => {
  const [value, setValue] = useState<'Books' | 'Categories' | 'Authors'>('Books');
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(setOpenSearchDialog(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as 'Books' | 'Categories' | 'Authors');
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
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
        <SearchBar type={value} action={handleClose} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loginState = useSelector((state: RootState) => state.DataReducer.loginState);

  if (!loginState) {
    return (
      <MsgDialogs
        title="Access Denied"
        msg="You can't open this page before login!"
        state={2}
        navigation={1}
      />
    );
  }

  return <>{children}</>;
};

export const PrivateRoute2: React.FC = () => {
  return <Navigate to="/" />;
};
