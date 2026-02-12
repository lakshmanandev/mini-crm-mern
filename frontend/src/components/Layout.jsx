import { Drawer, AppBar, Toolbar, List, ListItem, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 200;

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          MINI CRM
          <Button
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: drawerWidth }}>
        <Toolbar />
        <List>
          <ListItem component={Link} to="/dashboard">Dashboard</ListItem>
          <ListItem component={Link} to="/leads">Leads</ListItem>
          <ListItem component={Link} to="/companies">Companies</ListItem>
          <ListItem component={Link} to="/tasks">Tasks</ListItem>
        </List>
      </Drawer>

      <main style={{ flexGrow: 1, padding: 24, marginTop: 64 }}>
        <Outlet />
      </main>
    </div>
  );
}
