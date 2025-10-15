//import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './dashboard.css'
import Card from '../components/CardComponent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
    return (
        <Box className="dashboard-root">
            <Box component="main" className="dashboard-main app-main">
                <Grid container>
                    <Typography variant="h4" className="typography">BANXICO</Typography>
                </Grid>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Card />
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    )
}