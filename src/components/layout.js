import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// ✅ Restoring your original NAVIGATION structure
const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dashboard" },
  { segment: "orders", title: "Orders" },
  { kind: "divider" },
  { kind: "header", title: "Test Suite" },
  {
    segment: "Jobs",
    title: "Jobs",
    children: [
      { segment: "StopApp", title: "Stop Application", icon: <DescriptionIcon /> },
      { segment: "StartApp", title: "Start Application", icon: <DescriptionIcon /> },
      { segment: "Deployment", title: "IDIT Deployment", icon: <DescriptionIcon /> },
    ],
  },
  { segment: "integrations", title: "Integrations", icon: <LayersIcon /> },
];

// ✅ Keeping your theme unchanged
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
});

// ✅ Main Dashboard Component with Logout Button
export default function DashboardLayoutBasic({ onLogout }) {
  const navigate = useNavigate();

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            src="https://försäkring.se/images/company-logos/folksam-forsakring-logotyp.png"
            alt="Logo"
          />
        ),
        title: "", // ✅ Removed "Dashboard" next to the logo
        homeUrl: "/dashboard",
      }}
      theme={demoTheme}
    >
      <DashboardLayout>
        {/* ✅ Logout Button Fixed */}
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <Button variant="contained" color="error" onClick={onLogout}>
            🔴 Logout
          </Button>
        </Box>

        {/* ✅ Keeping StopApp inside the dashboard (No function, just content) */}
        <PageContainer>
          <h2>Welcome to the Dashboard</h2>

          {/* ✅ Restored StopApp content exactly as it was */}
          <h2>Stop Application</h2>
          <p>This page allows you to stop an application gracefully.</p>
          <TextField
            fullWidth
            label="Environment Name"
            placeholder="Enter environment name"
            margin="normal"
          />
          <Button variant="contained" color="error" sx={{ mt: 2 }}>
            Stop Application
          </Button>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}