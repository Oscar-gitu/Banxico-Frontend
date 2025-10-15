//import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './dashboard.css'
import Card from '../components/CardComponent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SelectComponent from '../components/SelectComponent';
import { useState, useEffect } from 'react';
import DatePickerComponent from '../components/DatePickerComponent';
import { getSeriesData } from '../components/services/banxicoApi';

const optionsSelect: Record<string, string> = {
    "Tipo de cambio": "SF43718",
    "Tasa objetivo": "SF61745",
    "UDIS": "SP68257"
}

export default function Dashboard() {
    const optionLabels = Object.keys(optionsSelect);
    const [selected, setSelected] = useState<string>(optionLabels[0]);
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const [dateRange, setDateRange] = useState<[Date, Date]>([monthStart, today]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await getSeriesData(optionsSelect[selected], dateRange[0], dateRange[1]);
                console.log(data);
            };
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }, [selected, dateRange]);

    return (
        <Box className="dashboard-root">
            <Box component="main" className="dashboard-main app-main">
                <Grid container className="dashboard-container">
                    <Typography variant="h4" className="typography">DASHBOARD</Typography>
                </Grid>
                <Grid container spacing={2} className="dashboard-container">
                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                        <SelectComponent
                            content="Serie"
                            options={optionLabels}
                            value={selected}
                            onChange={(label) => {
                                setSelected(label);
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                        <DatePickerComponent
                            value={dateRange}
                            onChange={(val) => setDateRange(val as [Date, Date])}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card title={'Valor Actual: ' + selected} content="" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card title="Valor Anterior: " content="" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card title="Variación: " content="" />
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    )
}