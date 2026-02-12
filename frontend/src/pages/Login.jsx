import { useState } from "react";
import api from "../api/axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          MINI CRM
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={login}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
