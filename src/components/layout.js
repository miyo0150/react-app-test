import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
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

// ✅ Custom router logic
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  return {
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  };
}

// ✅ Stop Application Page - RESTORED WITH INPUT FIELD & BUTTON
function StopApplicationPage() {
  const [environment, setEnvironment] = React.useState("");

  const handleStopApp = () => {
    console.log(`🚨 Stopping application for environment: ${environment}`);
    alert(`Application for ${environment} has been stopped.`);
  };

  return (
    <div>
      <h2>Stop Application</h2>
      <p>This page allows you to stop an application gracefully.</p>
      <TextField
        fullWidth
        label="Environment Name"
        placeholder="Enter environment name"
        margin="normal"
        value={environment}
        onChange={(e) => setEnvironment(e.target.value)}
      />
      <Button variant="contained" color="error" onClick={handleStopApp}>
        Stop Application
      </Button>
    </div>
  );
}

// ✅ Default Page (Keeps other pages working properly)
function DefaultPage({ page }) {
  return (
    <div>
      <h2>{page} Page</h2>
      <p>Content for the {page} page will go here.</p>
    </div>
  );
}

// ✅ Main Dashboard Component with Logout Button
export default function DashboardLayoutBasic({ onLogout }) {
  const navigate = useNavigate();
  const router = useDemoRouter("/dashboard");

  const renderContent = () => {
    switch (router.pathname) {
      case "/Jobs/StopApp":
        return <StopApplicationPage />; // ✅ Now this page is fully restored!
      default:
        return <DefaultPage page={router.pathname} />;
    }
  };

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

        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}