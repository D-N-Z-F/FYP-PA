import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { capitalize, processFictionFilters } from "../utils/helpers";
import { getFictionBooks } from "../services/api";

export default function FictionBooks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("none");
  const [filters, setFilters] = useState([genre, sort]);
  const genreValues = ["All", "Fantasy", "Sci-Fi", "Dystopian"];
  const sortValues = ["none", "title", "rating"];
  const dataKeys = ["Title", "Author", "Genre", "Rating"];

  const onGenreChange = (e) => setGenre(e.target.value);
  const onSortChange = (e) => setSort(e.target.value);
  const fetch = async () => {
    try {
      const result = await getFictionBooks(processFictionFilters(filters));
      setData(result);
    } catch (error) {
      console.error("Failed to fetch fiction books:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setFilters([genre, sort]), [genre, sort]);

  useEffect(() => {
    setLoading(true);
    fetch();
  }, [filters]);

  return (
    <Box
      sx={{
        boxShadow: 3,
        p: 4,
        borderRadius: 2,
        backgroundColor: "white",
        minWidth: "80vw",
      }}
    >
      {/* Page Heading */}
      <Typography variant="h5" sx={{ textAlign: "left", paddingBottom: 1 }}>
        Fiction Books
      </Typography>

      {/* Filter Options */}
      <Box sx={{ textAlign: "left", paddingBottom: 1 }}>
        Filter By Genre:
        <Select
          id="Genre"
          value={genre}
          label="Genre"
          onChange={onGenreChange}
          sx={{ mx: 2 }}
        >
          {genreValues.map((value, idx) => (
            <MenuItem key={idx} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        Sort By:
        <Select
          id="Sort"
          value={sort}
          label="Sort"
          onChange={onSortChange}
          sx={{ mx: 2 }}
        >
          {sortValues.map((value, idx) => (
            <MenuItem key={idx} value={value}>
              {capitalize(value)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ marginTop: 2, overflowX: "auto" }}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": { border: "1px solid black" },
            minWidth: 800,
          }}
        >
          <TableHead sx={{ backgroundColor: "grey" }}>
            <TableRow>
              {dataKeys.map((key, idx) => (
                <TableCell key={idx}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && data.length ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.genre}</TableCell>
                  <TableCell>{item.rating}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={-1}>
                <TableCell colSpan={dataKeys.length}>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : error ? (
                    error?.message || error?.toString() || "An error occurred!"
                  ) : (
                    "No data found!"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
