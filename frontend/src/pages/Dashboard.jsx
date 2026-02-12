import { useEffect, useState } from "react";
import api from "../api/axios";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/dashboard").then(res => setData(res.data));
  }, []);

  const CardBox = ({ title, value }) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}><CardBox title="Total Leads" value={data.totalLeads} /></Grid>
      <Grid item xs={6}><CardBox title="Qualified Leads" value={data.qualifiedLeads} /></Grid>
      <Grid item xs={6}><CardBox title="Tasks Due Today" value={data.tasksDueToday} /></Grid>
      <Grid item xs={6}><CardBox title="Completed Tasks" value={data.completedTasks} /></Grid>
    </Grid>
  );
}
