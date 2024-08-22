import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import Navbar from '../components/homeComponents/Navbar';
import SidePanal from '../components/Dashboard/SidePanal';
import UsersTable from '../components/Dashboard/UsersTable';

function Dashboard() {
    const { mode } = useSelector((state: any) => state.DataReducer);
    const [selectedTab, setSelectedTab] = useState(0);

    const theme = createTheme({
        palette: {
            mode: mode || 'light',
            background: {
                default: mode === 'light' ? '#fff' : '#121212',
                paper: mode === 'light' ? '#fff' : '#1e1e1e', 
            },
        },
    });

    const handleTabChange = (newValue: number) => {
        setSelectedTab(newValue);
    };

    const getFilterState = () => {
        switch (selectedTab) {
            case 1:
                return 'Read';
            case 2:
                return 'Currently Reading';
            case 3:
                return 'Want to Read';
            default:
                return 'All';
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Box sx={{ flex: 1, display: 'flex' }}>
                    <SidePanal selectedTab={selectedTab} onTabChange={handleTabChange} />
                    <Box sx={{ flex: 1 }}>
                        <UsersTable filterState={getFilterState()} />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard;
