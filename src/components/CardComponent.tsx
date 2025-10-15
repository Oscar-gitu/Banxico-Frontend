
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function CardComponent() {
    return (
        <>
            <Card>
                <CardHeader
                    title="Card Header"
                />
                <CardContent>
                    <Typography>
                        Card Content
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}