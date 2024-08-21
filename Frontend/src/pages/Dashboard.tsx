import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/homeComponents/Navbar';
import SidePanal from '../components/Dashboard/SidePanal';
import UsersTable from '../components/Dashboard/UsersTable';
// import Footer from '../components/homeComponents/Footer';

function Dashboard() {
    const { mode } = useSelector((state: any) => state.DataReducer);
    const [selectedTab, setSelectedTab] = useState(0);

    const theme = createTheme({
        palette: {
            mode: mode || 'light',
        },
    });

    const handleTabChange = (newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <SidePanal selectedTab={selectedTab} onTabChange={handleTabChange} />
            <UsersTable />
            {/* <Footer /> */}
        </ThemeProvider>
    );
}

export default Dashboard;
