import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const destinations = [
    { name: "Home", link: "/" },
    { name: "Fiction Books", link: "/fiction-books" },
    { name: "Non-Fiction Books", link: "/non-fiction-books" },
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        {destinations.map((dest, idx) => (
          <Button
            key={idx}
            component={NavLink}
            to={dest.link}
            sx={{
              color: "black",
              mx: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "black",
                backgroundColor: "#f5f5f5",
                transform: "translate(-2px, -2px)",
                boxShadow: "4px 4px 0px 0px black",
              },
              "&.active": {
                color: "black",
                backgroundColor: "#f5f5f5",
                transform: "translate(-2px, -2px)",
                boxShadow: "4px 4px 0px 0px black",
              },
            }}
            style={{ textDecoration: "none" }}
          >
            {dest.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}
