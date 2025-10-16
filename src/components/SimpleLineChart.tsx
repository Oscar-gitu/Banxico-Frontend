
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function LineChartBanxico({ values }: { values?: any[] }) {
    const list = Array.isArray(values) ? values : [];
    const data = list.map((item: any) => ({
        fecha: item.fecha,
        dato: parseFloat(item.dato)
    }));

    return (
        <Card sx={{ width: "100%", height: 400 }}>
            <CardContent sx={{ height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                    Valor diario
                </Typography>
                <Box sx={{ width: "100%", height: "calc(100% - 40px)" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="fecha" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="dato"
                                stroke="#1976d2"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
