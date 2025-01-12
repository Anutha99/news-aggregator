import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">News Aggregator</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
