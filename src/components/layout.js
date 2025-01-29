import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";  // ✅ Import MUI Button
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dashboard" },
  { segment: "orders", title: "Orders" },
  { kind: "divider" },
  { kind: "header", title: "Test Suite" },
  { segment: "integrations", title: "Integrations" },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
});

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    console.log("🔴 Logging out...");
    localStorage.removeItem("user");  // Remove user session
    navigate("/");  // Redirect to login
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
        title: "Dashboard",
        homeUrl: "/dashboard",
      }}
      theme={demoTheme}
      window={window ? window() : undefined}
    >
      <DashboardLayout>
        {/* ✅ ADD LOGOUT BUTTON HERE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            🔴 Logout
          </Button>
        </Box>

        {/* Render Page Content */}
        <PageContainer>
          <h2>Welcome to the Dashboard</h2>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}