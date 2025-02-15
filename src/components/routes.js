import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';

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

const jobRoutes = [
  {
    segment: 'header-jobs',
    title: 'Jobs',
    icon: <FolderIcon/>,
    children: []
  }
]

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

const addToHeaderJobs = (routes, ...subRoutes) => {
  return routes.map((route) =>
    route.segment === "header-jobs"
      ? { ...route, children: [...route.children, ...subRoutes.flat()] }
      : route
  );
};

export const getActiveRoutes = (role) => {
  let activeRoutesTest = [...globalRoutes];
  
    switch(role) {
        case "admin":
          activeRoutesTest =[...activeRoutesTest, ...jobRoutes];
          activeRoutesTest = addToHeaderJobs(activeRoutesTest, testerRoutes, timeshiftRoutes);
        return activeRoutesTest;
        case "tester":
          activeRoutesTest =[...activeRoutesTest, ...jobRoutes];
          activeRoutesTest = addToHeaderJobs(activeRoutesTest, testerRoutes);
        return activeRoutesTest;
        default:
        return [...globalRoutes]
    }
}
  
