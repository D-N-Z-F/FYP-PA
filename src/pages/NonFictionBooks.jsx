import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { getNonFictionBooks } from "../services/api";
import { processNonFictionFilters } from "../utils/helpers";

export default function NonFictionBooks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState([searchValue, page, limit]);
  const limitValues = [3, 6, 10];

  const onValueChange = (e) => setSearchValue(e.target.value);
  const onKeyDown = (e) => e.key === "Enter" && setPage(1);
  const prevPage = () => page > 1 && setPage(page - 1);
  const nextPage = () => data.length && setPage(page + 1);
  const onLimitChange = (e) => {
    setPage(1);
    setLimit(e.target.value);
  };

  const fetch = async () => {
    try {
      const result = await getNonFictionBooks(
        processNonFictionFilters(filters)
      );
      setData(result);
    } catch (error) {
      console.error("Failed to fetch fiction books:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setFilters([searchValue, page, limit]), [page, limit]);

  useEffect(() => {
    setLoading(true);
    fetch();
  }, [filters]);

  return (
    <Box
      sx={{
        minWidth: "80vw",
        boxShadow: 3,
        p: 4,
        borderRadius: 2,
        backgroundColor: "white",
        mt: 2,
      }}
    >
      {/* Page Heading */}
      <Typography variant="h5" sx={{ textAlign: "left", paddingBottom: 1 }}>
        Non-Fiction Books
      </Typography>

      {/* Filter Options */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Search By Title / Author:
          <TextField
            label="Search here..."
            variant="outlined"
            value={searchValue}
            onChange={onValueChange}
            onKeyDown={onKeyDown}
            sx={{ mx: 2 }}
          />
        </Box>
        <Box>
          Books Per Page:
          <Select
            id="Limit"
            value={limit}
            label="Limit"
            onChange={onLimitChange}
            sx={{ mx: 2 }}
          >
            {limitValues.map((value, idx) => (
              <MenuItem key={idx} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Grid */}
      <Box sx={{ flexGrow: 1, p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          {!loading && data.length ? (
            data.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: "100%", boxShadow: 2, borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">
                      Author: {item.author}
                    </Typography>
                    <Typography variant="body2">
                      Category: {item.category}
                    </Typography>
                    <Typography variant="body2">
                      Rating: {item.rating}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                boxShadow: 2,
                p: 4,
                borderRadius: 2,
                mx: "auto",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                {loading ? (
                  <CircularProgress size={40} />
                ) : error ? (
                  error?.message || error?.toString() || "An error occurred!"
                ) : (
                  "No data found!"
                )}
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>

      {/* Pagination Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "grey" }}
          disabled={page === 1}
          onClick={prevPage}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "grey" }}
          disabled={!data.length}
          onClick={nextPage}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
