import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [leads, setLeads] = useState([]);

  const loadData = async () => {
    const res = await api.get(`/companies/${id}`);
    setCompany(res.data.company);
    setLeads(res.data.leads);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p><b>Industry:</b> {company.industry}</p>
      <p><b>Location:</b> {company.location}</p>

      <h3>Associated Leads</h3>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l._id}>
              <td>{l.name}</td>
              <td>{l.status}</td>
              <td>{l.assignedTo?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
