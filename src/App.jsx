import "./App.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FictionBooks from "./pages/FictionBooks";
import NonFictionBooks from "./pages/NonFictionBooks";

function App() {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fiction-books" element={<FictionBooks />} />
          <Route path="/non-fiction-books" element={<NonFictionBooks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
