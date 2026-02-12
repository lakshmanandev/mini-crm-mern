import { useEffect, useState } from "react";
import api from "../api/axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const loadCompanies = async () => {
    const res = await api.get("/companies");
    setCompanies(res.data);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div>
      <h2>Companies</h2>

      <Button
        variant="contained"
        onClick={() => navigate("/companies/new")}
        sx={{ mb: 2 }}
      >
        + Add Company
      </Button>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.industry}</td>
              <td>{c.location}</td>
              <td>
                <Button onClick={() => navigate(`/companies/${c._id}`)}>
                  View
                </Button>
                <Button onClick={() => navigate(`/companies/edit/${c._id}`)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
