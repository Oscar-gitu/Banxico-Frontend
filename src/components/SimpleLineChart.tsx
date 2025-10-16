
import { Typography, Box } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { BanxicoDato } from '../types/banxico';
import CardSkeleton from './skeletons/CardSkeleton';

export default function LineChartBanxico({ values }: { values?: BanxicoDato[] }) {
    const list: BanxicoDato[] = Array.isArray(values) ? values : [];
    const data = list.map((item: BanxicoDato) => ({
        fecha: item.fecha,
        dato: parseFloat(item.dato)
    }));

    if (!data.length) {
        return <CardSkeleton withHeader lines={6} height={24} />;
    }

    const numberFormatter = new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    });

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins, Roboto, sans-serif', fontWeight: 600, mb: 1 }}>
                Valor histórico:
            </Typography>
            <Box sx={{ width: "100%", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 24, left: 8, bottom: 8 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="fecha"
                            minTickGap={24}
                            interval="preserveStartEnd"
                            tick={{ fontSize: 12, fontFamily: 'Poppins, Roboto, sans-serif', fill: '#4b5563' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            tickFormatter={(v) => numberFormatter.format(Number(v))}
                            tick={{ fontSize: 12, fontFamily: 'Poppins, Roboto, sans-serif', fill: '#4b5563' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip
                            formatter={(value: number) => numberFormatter.format(Number(value))}
                            labelFormatter={(label: string) => label}
                            contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb', fontFamily: 'Poppins, Roboto, sans-serif' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="dato"
                            stroke="#1976d2"
                            strokeWidth={2.2}
                            dot={{ r: 2 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
