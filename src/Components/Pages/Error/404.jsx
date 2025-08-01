import { Box, Grid2 as Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageNotFound = () => (
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
            <Grid size={4}></Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, textAlign: "center" }}>
                        404!
                    </Typography>
                    <Typography sx={{ fontSize: 24, fontWeight: 400, mb: 2 }} color="textSecondary">
                        Page Not Found
                    </Typography>
                    <IconButton sx={{ borderRadius: 2, p: 2 }}>
                        <ArrowBackIcon sx={{ mr: 2, color: "black" }} /><Link to={'/dashboard'} style={{ textDecoration: "none", color: "black" }}>dashboard</Link>
                    </IconButton>
                </Box>
            </Grid>
            <Grid size={4}></Grid>
        </Grid>
    </>
)

export default PageNotFound;