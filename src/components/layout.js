import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// ✅ Restoring your original NAVIGATION structure
const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
  },
  {
    segment: "orders",
    title: "Orders",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Test Suite",
  },
  {
    segment: "Jobs",
    title: "Jobs",
    children: [
      {
        segment: "StopApp",
        title: "Stop Application",
        icon: <DescriptionIcon />,
      },
      {
        segment: "StartApp",
        title: "Start Application",
        icon: <DescriptionIcon />,
      },
      {
        segment: "Deployment",
        title: "IDIT Deployment",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

// ✅ Keeping your theme unchanged
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// ✅ Keeping your custom router logic
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

// ✅ Keeping your Skeleton component unchanged
const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

// ✅ Keeping your Stop Application Page unchanged
function StopApplicationPage() {
  return (
    <div>
      <h2>Stop Application</h2>
      <p>This page allows you to stop an application gracefully.</p>
      <TextField
        fullWidth
        label="Environment Name"
        placeholder="Enter environment name"
        margin="normal"
      />
      <Button variant="contained" color="error">
        Stop Application
      </Button>
    </div>
  );
}

// ✅ Keeping DefaultPage unchanged
function DefaultPage({ page }) {
  return (
    <div>
      <h2>{page} Page</h2>
      <p>Content for the {page} page will go here.</p>
    </div>
  );
}

// ✅ Adding Logout Button inside DashboardLayout
export default function DashboardLayoutBasic({ onLogout }) {
  const navigate = useNavigate();
  const router = useDemoRouter("/dashboard");

  // ✅ Logout function
  const handleLogout = () => {
    console.log("🔴 Logging out...");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); // 🔄 Force full refresh to clear authentication state
  };

  const handleNavigationClick = (path) => {
    router.navigate(path);
  };

  const renderContent = () => {
    switch (router.pathname) {
      case "/Jobs/StopApp":
        return <StopApplicationPage />;
      default:
        return <DefaultPage page={router.pathname} />;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((nav) => ({
        ...nav,
        onClick: nav.segment ? () => handleNavigationClick(`/${nav.segment}`) : undefined,
      }))}
      branding={{
        logo: (
          <img
            src="https://försäkring.se/images/company-logos/folksam-forsakring-logotyp.png"
            alt="Logo"
         