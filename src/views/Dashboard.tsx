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
import { getMinMaxFromDatos } from '../utils/seriesStats';
import SimpleLineChart from "../components/SimpleLineChart";
import TableComponent from '../components/TableComponent';
import type { BanxicoResponse } from '../types/banxico';
import { DateObject } from 'react-multi-date-picker';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

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
    const [dateRange, setDateRange] = useState<DateObject[]>([new DateObject(monthStart), new DateObject(today)]);
    const [data, setData] = useState<BanxicoResponse | null>(null);
    const [todayData, setTodayData] = useState<string | null>(null);
    const [minVal, setMinVal] = useState<string | null>(null);
    const [maxVal, setMaxVal] = useState<string | null>(null);

    useEffect(() => {
        const [start, end] = dateRange || [] as unknown as [DateObject, DateObject];
        if (!start || !end) return;
        try {
            setData(null);
            setMinVal(null);
            setMaxVal(null);
            const fetchData = async () => {
                const res = await getSeriesData(optionsSelect[selected], start, end);
                setData(res);
                const datos = res?.bmx?.series?.[0]?.datos ?? [];
                const { min, max } = getMinMaxFromDatos(datos);
                setMinVal(min);
                setMaxVal(max);
            };
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }, [selected, dateRange]);

    useEffect(() => {
        const run = async () => {
            try {
                const now = new Date();
                setTodayData(null);
                const res = await getSeriesData(optionsSelect[selected], now, now);
                setTodayData(res.bmx.series[0].datos[0].dato);
            } catch (err) {
                console.error(err);
            }
        };
        run();
    }, [selected]);

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
                            onChange={(val) => setDateRange(val)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} className="dashboard-container">
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card
                            variant="metric"
                            tone="primary"
                            icon={<TrendingFlatIcon />}
                            title={'Valor actual: ' + selected}
                            content={`${todayData ?? ''}`}
                            titleTooltip={"Valor actual al dia de hoy"}
                            helperText={"Al día de hoy"}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card
                            variant="metric"
                            tone="success"
                            icon={<TrendingUpIcon />}
                            title="Valor máximo"
                            content={`${maxVal ?? ''}`}
                            titleTooltip={"Valor máximo en el rango de fechas seleccionado"}
                            helperText={"Máximo del rango"}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card
                            variant="metric"
                            tone="warning"
                            icon={<TrendingDownIcon />}
                            title="Valor mínimo"
                            content={`${minVal ?? ''}`}
                            titleTooltip={"Valor mínimo en el rango de fechas seleccionado"}
                            helperText={"Mínimo del rango"}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} className="dashboard-container">
                    <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                        <SimpleLineChart values={data?.bmx?.series?.[0]?.datos ?? []} />
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                        <TableComponent values={data?.bmx?.series?.[0]?.datos} />
                    </Grid>
                </Grid> 
            </Box>
            <Footer />
        </Box>
    )
}