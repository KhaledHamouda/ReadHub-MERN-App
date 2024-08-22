import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, marginTop: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface SidePanalProps {
    selectedTab: number;
    onTabChange: (newValue: number) => void;
}

const SidePanal: React.FC<SidePanalProps> = ({ selectedTab, onTabChange }) => {
    const { mode } = useSelector((state: any) => state.DataReducer);

    return (
        <Box sx={{
            width: 250, 
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto',
            borderRight: 1,
            borderColor: 'divider',
        }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedTab}
                onChange={(event, newValue) => onTabChange(newValue)}
                aria-label="Vertical tabs example"
                sx={{
                    background: mode === 'light' ? "rgb(55, 149, 189)" : "rgba(38, 40, 51, .5)",
                    color: 'white',
                    height:"100vh",
                    fontSize: 20,
                    '& .Mui-selected': {
                        color: 'green',
                    },
                }}
            >
                <Tab sx={{ color: 'white', fontWeight: 500, fontFamily: 'Oswald' }} label="All" {...a11yProps(0)} />
                <Tab sx={{ color: 'white', fontWeight: 500, fontFamily: 'Oswald' }} label="Read" {...a11yProps(1)} />
                <Tab sx={{ color: 'white', fontWeight: 500, fontFamily: 'Oswald' }} label="Currently Reading" {...a11yProps(2)} />
                <Tab sx={{ color: 'white', fontWeight: 500, fontFamily: 'Oswald' }} label="Want to Read" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                {/* All books */}
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                {/* Read books */}
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
                {/* Currently Reading books */}
            </TabPanel>
            <TabPanel value={selectedTab} index={3}>
                {/* Want to Read books */}
            </TabPanel>
        </Box>
    );
};

export default SidePanal;
