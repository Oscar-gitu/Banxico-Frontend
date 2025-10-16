
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import './Footer.css'

function Footer() {
    return (
        <>
            <Container maxWidth={false} className="footer-container">
                <Typography variant="body2" className="footer-title">
                    BANXICO
                </Typography>
            </Container>
        </>
    )
}

export default Footer
