import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import ToolbarActionsSignOut from './signOutFunction';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
  },
  {
    segment: 'orders',
    title: 'Orders',
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Test Suite',
  },
  {
    segment: 'Jobs',
    title: 'Jobs',
    children: [
      {
        segment: 'StopApp',
        title: 'Stop Application',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'StartApp',
        title: 'Start Application',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Deployment',
        title: 'IDIT Deployment',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
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

function StartApplicationPage() {
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

function DefaultPage({ page }) {
  return (
    <div>
      <h2>{page} Page</h2>
      <p>Content for the {page} page will go here.</p>
    </div>
  );
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  const handleNavigationClick = (path) => {
    router.navigate(path);
  };

  //Will render based on router
  const renderContent = () => { 
    switch (router.pathname) {
      case '/Jobs/StopApp':
        return <StopApplicationPage />;
      case '/Jobs/StartApp':
        return <StartApplicationPage/>;
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
          <img src="https://försäkring.se/images/company-logos/folksam-forsakring-logotyp.png" alt="Logo" />
        ),
        title: '',
        homeUrl: '/',
      }}
      router={router}
      theme={demoTheme}
      window={window ? window() : undefined}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsSignOut,
        }}
        >
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}