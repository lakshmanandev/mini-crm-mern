import { useEffect, useState } from "react";
import api from "../api/axios";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "",
    industry: "",
    location: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const loadCompany = async () => {
    const res = await api.get(`/companies/${id}`);
    setForm(res.data.company);
  };

  useEffect(() => {
    if (id) loadCompany();
  }, [id]);

  const handleSubmit = async () => {
    if (id) {
      await api.put(`/companies/${id}`, form);
    } else {
      await api.post("/companies", form);
    }
    navigate("/companies");
  };

  return (
    <div>
      <h2>{id ? "Edit Company" : "Add Company"}</h2>

      <TextField
        label="Company Name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <TextField
        label="Industry"
        fullWidth
        margin="normal"
        value={form.industry}
        onChange={(e) => setForm({ ...form, industry: e.target.value })}
      />

      <TextField
        label="Location"
        fullWidth
        margin="normal"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
      <Button onClick={() => navigate("/companies")} sx={{ ml: 1 }}>
        Cancel
      </Button>
    </div>
  );
}
