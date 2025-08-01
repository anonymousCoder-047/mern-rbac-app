import { Box, IconButton, Typography, Grid2 as Grid } from "@mui/material";
import { Component } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {}
  
    render() {
      if (this.state.hasError) {

        return this.props.fallback ? this.props.fallback : (
          <>
              <Grid container spacing={2} sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  height: "100vh",
                  p: 2
              }}>
                  <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="h3" sx={{ fontWeight: 900, textAlign: "center" }}>
                          500!
                      </Typography>
                      <Typography sx={{ fontSize: 24, fontWeight: 400, mb: 2 }} color="textSecondary">
                          Internal Server Error
                      </Typography>
                      <IconButton sx={{ borderRadius: 2, p: 2 }}>
                          <ArrowBackIcon sx={{ mr: 2, color: "black" }} /><Typography component={'a'} href={'/dashboard'} style={{ textDecoration: "none", color: "black" }}>Home</Typography>
                      </IconButton>
                  </Box>
              </Grid>
          </>
        )}
      return this.props.children;
    }
}

export default ErrorBoundary;