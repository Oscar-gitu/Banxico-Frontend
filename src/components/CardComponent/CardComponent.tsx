import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import CardSkeleton from '../skeletons/CardSkeleton';
import './CardComponent.css';
import type React from 'react';

type Tone = 'primary' | 'success' | 'warning' | 'info' | 'error';

export default function CardComponent({
    title,
    content,
    titleTooltip,
    icon,
    helperText,
    tone
}: {
    title: string,
    content: string,
    titleTooltip?: string,
    icon?: React.ReactNode,
    helperText?: string,
    tone?: Tone
}) {
    if (content == null || content.trim() === '') {
        return <CardSkeleton withHeader lines={1} height={28} />
    }

    const toneClass = tone ? `card-metric--${tone}` : 'card-metric--primary';
    return (
        <Card
            className={`card-metric ${toneClass}`}
            elevation={0}
            sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(16,24,40,0.15)'
            }}
        >
            <CardHeader
                sx={{ alignItems: 'center', '& .MuiCardHeader-subheader': { marginTop: 0 } }}
                avatar={icon ? <span className="card-metric__icon">{icon}</span> : undefined}
                title={
                    <span className="card-metric__title">
                        {titleTooltip ? (
                            <Tooltip title={titleTooltip} arrow>
                                <span>{title}</span>
                            </Tooltip>
                        ) : (
                            <span>{title}</span>
                        )}
                    </span>
                }
                subheader={
                    <span className="card-metric__content">
                        <Typography variant="h5" className="card-metric__value" sx={{ fontWeight: 700, fontFamily: 'Poppins, Roboto, sans-serif' }}>
                            {content}
                        </Typography>
                        {helperText ? (
                            <Typography variant="body2" className="card-metric__helper">{helperText}</Typography>
                        ) : null}
                    </span>
                }
            />
        </Card>
    );
}
