import { useEffect, useState } from "react";
import api from "../api/axios";
import { Button } from "@mui/material";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const load = () => api.get("/tasks").then(res => setTasks(res.data));

  useEffect(() => { load(); }, []);

  const markDone = async (id) => {
    await api.put(`/tasks/${id}/status`, { status: "Completed" });
    load();
  };

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(t => (
        <div key={t._id}>
          {t.title} – {t.lead?.name} – {t.status}
          {t.status === "Pending" && (
            <Button onClick={() => markDone(t._id)}>Done</Button>
          )}
        </div>
      ))}



      {/* {tasks.map(t => (
        <div key={t._id} style={{ padding: 8 }}>
          <b>{t.title}</b> <br />
          Lead: {t.lead?.name} <br />
          Status: {t.status}
        </div>
      ))} */}

    </div>
  );
}
