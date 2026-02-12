import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function LeadForm() {
  const { id } = useParams(); // if id exists → Edit
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    assignedTo: "",
    company: ""
  });

  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
    api.get("/companies").then(res => setCompanies(res.data));

    if (id) {
      api.get(`/leads/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveLead = async () => {
    if (id) {
      await api.put(`/leads/${id}`, form);
    } else {
      await api.post("/leads", form);
    }
    navigate("/leads");
  };

  return (
    <Box maxWidth={500}>
      <Typography variant="h6" mb={2}>
        {id ? "Edit Lead" : "Add Lead"}
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        select
        fullWidth
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        margin="normal"
      >
        {["New", "Contacted", "Lost"].map(s => (
          <MenuItem key={s} value={s}>{s}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        label="Assigned To"
        name="assignedTo"
        value={form.assignedTo}
        onChange={handleChange}
        margin="normal"
      >
        {users.map(u => (
          <MenuItem key={u._id} value={u._id}>{u.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        label="Company"
        name="company"
        value={form.company}
        onChange={handleChange}
        margin="normal"
      >
        {companies.map(c => (
          <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
        ))}
      </TextField>

      <Box mt={2}>
        <Button variant="contained" onClick={saveLead}>Save</Button>
        <Button sx={{ ml: 1 }} onClick={() => navigate("/leads")}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
