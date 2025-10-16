import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import CardSkeleton from './skeletons/CardSkeleton';

export default function CardComponent({ title, content, titleTooltip }: { title: string, content: string, titleTooltip?: string }) {
    if (content == null || content.trim() === '') {
        return <CardSkeleton withHeader lines={1} height={28} />
    }
    return (
        <>
            <Card>
                <CardHeader
                    title={
                        titleTooltip ? (
                            <Tooltip title={titleTooltip} arrow>
                                <span>{title}</span>
                            </Tooltip>
                        ) : (
                            title
                        )
                    }
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