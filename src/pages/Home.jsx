import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box sx={{ boxShadow: 2, p: 4, borderRadius: 2, backgroundColor: "white" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Welcome to Bookstore Adventures
      </Typography>
      <Typography variant="body1">
        This is the homepage. Use the navigation links to explore!
      </Typography>
    </Box>
  );
}
