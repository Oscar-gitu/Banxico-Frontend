import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';

export default function CardSkeleton({ withHeader = true, lines = 2, height = 28 }: { withHeader?: boolean; lines?: number; height?: number }) {
  return (
    <Card>
      {withHeader && (
        <CardHeader
          title={<Skeleton variant="text" animation="wave" width={160} height={28} />}
        />
      )}
      <CardContent>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" animation="wave" height={height} sx={{ mb: i === lines - 1 ? 0 : 1 }} />
        ))}
      </CardContent>
    </Card>
  );
}
