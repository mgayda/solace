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

      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
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

      <Stack spacing={3}>
        {advocates.length > 0 ? (
          advocates.map((advocate) => (
            <Card key={advocate.id} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, color: "#061a3e" }}>
                  {advocate.firstName} {advocate.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {advocate.degree} — {advocate.city}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Specialties:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                  {advocate.specialties.map((specialty, idx) => (
                    <Chip
                      key={idx}
                      label={specialty}
                      size="small"
                      sx={{ backgroundColor: "#797e7b", color: "white" }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Experience: {advocate.yearsOfExperience} years
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Phone: {advocate.phoneNumber.slice(0, 3)}-
                  {advocate.phoneNumber.slice(3, 6)}-
                  {advocate.phoneNumber.slice(6)}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6">No Results Found</Typography>
        )}
      </Stack>

      <Box display="flex" justifyContent="center" mt={5}>
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
