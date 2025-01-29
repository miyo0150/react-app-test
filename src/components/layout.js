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

// ✅ Keeping your original NAVIGATION structure
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

// ✅ Theme remains unchanged
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
});

export default function DashboardLayoutBasic({ onLogout }) {
  const navigate = useNavigate();
  const [activePage, setActivePage] = React.useState("dashboard"); // ✅ Controls the displayed content

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <h2>Welcome to the Dashboard</h2>;

      case "orders":
        return (
          <div>
            <h2>Orders</h2>
            <p>Manage all orders here.</p>
          </div>
        );

      case "StopApp":
        return (
          <div>
            <h2>Stop Application</h2>
            <p>This section allows you to stop an application.</p>
            <TextField fullWidth label="Environment Name" placeholder="Enter environment name" margin="normal" />
            <Button variant="contained" color="error" sx={{ mt: 2 }}>
              Stop Application
            </Button>
          </div>
        );

      case "StartApp":
        return (
          <div>
            <h2>Start Application</h2>
            <p>This section allows you to start an application.</p>
            <TextField fullWidth label="Environment Name" placeholder="Enter environment name" margin="normal" />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Start Application
            </Button>
          </div>
        );

      case "Deployment":
        return (
          <div>
            <h2>IDIT Deployment</h2>
            <p>Manage deployment operations here.</p>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
              Deploy Now
            </Button>
          </div>
        );

      case "integrations":
        return (
          <div>
            <h2>Integrations</h2>
            <p>Manage system integrations here.</p>
          </div>
        );

      default:
        return <h2>Welcome to the Dashboard</h2>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((nav) => ({
        ...nav,
        onClick: nav.segment ? () => setActivePage(nav.segment) : undefined, // ✅ Updates content instead of navigating
      }))}
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

        {/* ✅ Dynamically updates content based on selected item */}
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}