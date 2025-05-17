"use client";

import { useDebounce } from "@/libs/useDebounce";
import { Advocate } from "@/types/advocate";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Pagination,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // TODO: Add results limit dropdown
  const [loading, setLoading] = useState(true); // TODO: Handle loading
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const offset = (page - 1) * limit;

      try {
        const response = await fetch(
          `/api/advocates?query=${encodeURIComponent(
            debouncedSearch
          )}&limit=${limit}&offset=${offset}`
        );

        const json = await response.json();
        setAdvocates(json.data);
        setTotal(json.total);
      } catch (error) {
        console.log("Error fetching advocate data");
        setError("Error fetching advocate data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, page]);

  return (
    <Box
      sx={{
        maxWidth: "960px",
        mx: "auto",
        p: 4,
      }}
    >
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Typography variant="h4" sx={{ mb: 2 }}>
        Solace Advocates
      </Typography>

      <TextField
        fullWidth
        label="Search advocates"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        sx={{ mb: 4 }}
      />

      <Stack spacing={2}>
        {advocates.length > 0 ? (
          advocates.map((advocate) => (
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {advocate.firstName} {advocate.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {advocate.degree} — {advocate.city}
                </Typography>
                <Typography variant="body2">Specialties:</Typography>
                {advocate.specialties.map((specialty, idx) => (
                  <Chip key={idx} label={specialty} size="small" />
                ))}
                <Typography variant="body2">
                  Experience: {advocate.yearsOfExperience} years
                </Typography>
                <Typography variant="body2">
                  {/* TODO: Format number helper */}
                  Phone: {advocate.phoneNumber.substring(0, 3)}-
                  {advocate.phoneNumber.substring(3, 6)}-
                  {advocate.phoneNumber.substring(6, 10)}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6">No Results Found</Typography>
        )}
      </Stack>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
