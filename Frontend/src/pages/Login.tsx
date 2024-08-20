import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.svg';
import axiosInstance from '../axios';

// Validation schema with Zod
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Styled components
const FormContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
});

const FormCard = styled(Box)({
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
});

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
        const response = await axiosInstance.post('/users/login', data);
        if (response.status === 200) {
            sessionStorage.setItem('userToken', JSON.stringify(response.data));
            alert('You are successfully logged in');
            navigate('/categories');
        }
        } catch (error) {
        console.error(error);
        alert('Wrong email or/and password');
        }
    };

    return (
        <FormContainer>
        <FormCard>
            <img src={login} alt="Login" style={{ width: '100%', marginBottom: '16px' }} />
            <Typography variant="h6" gutterBottom>
            Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '16px' }}
            >
                Login
            </Button>
            </form>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
            Don't have an account?{' '}
            <Link href="/signup" variant="body2">
                Register
            </Link>
            </Typography>
        </FormCard>
        </FormContainer>
    );
    };

    export default LoginForm;
