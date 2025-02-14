import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { PageContainer } from '@toolpad/core/PageContainer';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
// import ToolbarActionsSignOut from './signOutFunction';
import FolderIcon from '@mui/icons-material/Folder';
import StopApplicationPage from './stopAppPage';
import StartApplicationPage from './startAppPage';
import { getActiveRoutes } from './routes/routes';


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

function DefaultPage({ page }) {
  return (
    <div>
      <h2>IDIT Test Suite</h2>
      <p>IDIT Test Suite is designed to centralize and manage
        scripts from various platforms <br/> such as GitLab, Jenkins, Azure DevOps, and more. 
        Instead of navigating through multiple sites,<br/>
        our system integrates several APIs to bring all your scripts into IDS.</p>
    </div>
  );
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  const activeRoutes = getActiveRoutes("admin");

  const handleNavigationClick = (path) => {
    router.navigate(path);
  };

  //Will render based on router
  const renderContent = () => { 
    switch (router.pathname) {
      case '/Jobs/section1/StopApp':
        return <StopApplicationPage />;
      case '/Jobs/StartApp':
        return <StartApplicationPage/>;
      default:
        return <DefaultPage page={router.pathname} />;
    }
  };

  return (
    <AppProvider
      navigation={activeRoutes.map((nav) => ({
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
          // toolbarActions: ToolbarActionsSignOut,
        }}
        >
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
