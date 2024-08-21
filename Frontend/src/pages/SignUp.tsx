import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

//  Zod Validation schema
const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  cpassword: z.string().min(8, "Confirm password must be at least 6 characters long"),
}).refine((data) => data.password === data.cpassword, {
  message: "Passwords don't match",
  path: ["cpassword"], // Path of error message
});

const SignUp = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: any) => {
    axiosInstance.post('/users/register/', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    .then(res => {
      console.log("Response:", res);
      alert("Welcome! Login to begin your reading journey");
      navigate('/login')
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        alert("This email already exists.");
      } else {
        alert("An error occurred. Please try again.");
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create a free account now!
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName ? String(errors.firstName.message) : ""}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName ? String(errors.lastName.message) : ""}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? String(errors.email.message) : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? String(errors.password.message) : ""}
              />
            )}
          />
          <Controller
            name="cpassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                error={!!errors.cpassword}
                helperText={errors.cpassword ? String(errors.cpassword.message) : ""}
              />
            )}
          />
          <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
