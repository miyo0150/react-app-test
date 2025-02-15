import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';

//Global routes are for anyone who has access to ITS
const globalRoutes = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Test Suite',
    },
]

//Root folder for scripts
const jobRoutes = [
  {
    segment: 'header-jobs',
    title: 'Scripts',
    icon: <FolderIcon/>,
    children: []
  }
]

//Folder for ?
const testerRoutes = [
    {
        
          segment: 'section-tester',
          title: 'IDIT General',
          icon: <FolderIcon/>,
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
]

//Folder for timeshifting scripts
const timeshiftRoutes = [
  {
      segment: 'section-timeshift',
      title: 'IDIT Timeshift',
      icon: <FolderIcon/>,
      children: [
          {
              segment: 'ScheduleJob',
              title: 'Schedule Job',
              icon: <DescriptionIcon />,
          },
          {
              segment: 'MonitorJobs',
              title: 'Monitor Jobs',
              icon: <DescriptionIcon />,
          },
      ],
  },
];

//Folder for infrastructure scripts. (Will be related to Team X)
const infraRoutes = [
  {
      segment: 'section-infra',
      title: 'IDIT Infrastruktur',
      icon: <FolderIcon/>,
      children: [
          {
              segment: 'test',
              title: 'Deployment',
              icon: <DescriptionIcon />,
          },
          {
              segment: 'test',
              title: 'Database backup',
              icon: <DescriptionIcon />,
          },
      ],
  },
];

//Function to add subRoutes to root folder "Scripts", possibility to add multiple arrays to "subRoutes".
const addToHeaderJobs = (routes, ...subRoutes) => {
  return routes.map((route) =>
    route.segment === "header-jobs"
      ? { ...route, children: [...route.children, ...subRoutes.flat()] }
      : route
  );
};

//Function to get active routes for user based on user role. MSAL Group. Ex. Admin === IDIT_TEAMX
export const getActiveRoutes = (role) => {
  let activeRoutesTest = [...globalRoutes];
  
    switch(role) {
      //Group === "IDIT_TEAMX"
        case "admin":
          activeRoutesTest =[...activeRoutesTest, ...jobRoutes];
          activeRoutesTest = addToHeaderJobs(activeRoutesTest, testerRoutes, timeshiftRoutes, infraRoutes);
        return activeRoutesTest;
      //Group === N/A
        case "tester":
          activeRoutesTest =[...activeRoutesTest, ...jobRoutes];
          activeRoutesTest = addToHeaderJobs(activeRoutesTest, testerRoutes);
        return activeRoutesTest;
      //Group === N/A
        default:
        return [...globalRoutes]
    }
}
  
