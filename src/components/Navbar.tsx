import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Navbar.css';

function ResponsiveAppBar() {
  return (
    <AppBar position="sticky">
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters className="navbar-toolbar">
          <Typography
            variant="h6"
            noWrap
            component="a"
            className="navbar-title"
          >
            BANXICO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
