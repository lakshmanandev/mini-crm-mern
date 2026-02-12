import { useEffect, useState } from "react";
import api from "../api/axios";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    const deleteLead = async (id) => {
        await api.delete(`/leads/${id}`);
        loadLeads();
    };


    const loadLeads = async () => {
        const res = await api.get(`/leads?page=${page}&search=${search}&status=${status}`);
        setLeads(res.data.data);
        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        loadLeads();
    }, [page]);

    return (
        <div>
            <h2>Leads</h2>
           <div>
                <TextField
                    select
                    size="small"
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Contacted">Contacted</MenuItem>
                    <MenuItem value="Lost">Lost</MenuItem>
                </TextField>
    
    
                <TextField
                    label="Search"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={loadLeads}>Search</Button>
    
                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => navigate("/leads/add")}
                >
                    + Add Lead
                </Button>
           </div>


            {leads.map(l => (
                <div key={l._id} style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
                    {l.name} – {l.status} – {l.assignedTo?.name}
                    <IconButton onClick={() => navigate(`/leads/edit/${l._id}`)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => deleteLead(l._id)}>
                        <DeleteIcon />
                    </IconButton>

                </div>
            ))}

            <div style={{ marginTop: 10 }}>
                <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
                <span> {page} / {totalPages} </span>
                <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
            </div>
        </div>
    );
}
