import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    variant,
    icon,
    helperText,
    tone
}: {
    title: string,
    content: string,
    titleTooltip?: string,
    variant?: 'default' | 'metric',
    icon?: React.ReactNode,
    helperText?: string,
    tone?: Tone
}) {
    if (content == null || content.trim() === '') {
        return <CardSkeleton withHeader lines={1} height={28} />
    }
    if (variant === 'metric') {
        const toneClass = tone ? `card-metric--${tone}` : 'card-metric--primary';
        return (
            <div className={`card-metric ${toneClass}`}>
                {icon ? (
                    <div className="card-metric__icon">{icon}</div>
                ) : null}
                <div className="card-metric__content">
                    <div className="card-metric__title">
                        {titleTooltip ? (
                            <Tooltip title={titleTooltip} arrow>
                                <span>{title}</span>
                            </Tooltip>
                        ) : (
                            <span>{title}</span>
                        )}
                    </div>
                    <div className="card-metric__value">{content}</div>
                    {helperText ? (
                        <div className="card-metric__helper">{helperText}</div>
                    ) : null}
                </div>
            </div>
        );
    }
    return (
        <>
            <Card className="card-root">
                <CardHeader
                    slotProps={{ title: { className: 'card-title' } }}
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
                    <Typography variant="h5" className="card-value">
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}
