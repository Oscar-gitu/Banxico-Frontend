
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function CardComponent({ title, content }: { title: string, content: string }) {
    return (
        <>
            <Card>
                <CardHeader
                    title={title}
                />
                <CardContent>
                    <Typography>
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}