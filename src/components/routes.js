import DescriptionIcon from '@mui/icons-material/Description';

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

const testerRoutes = [
    {
        segment: 'Jobs',
        title: 'Jobs',
        children: [
          {
          segment: 'section1',
          title: 'Section 1',
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
          ]
          },
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

const performanceRoutes = [
    {
      segment: "header",
      title: "Jobs",
      children: [
        {
          segment: "link",
          title: "Start Application Immedieatly",
          link: "/dsasda/dsadsad"
        }
      ]
    }
  ]
  

export const getActiveRoutes = (role) => {

    switch(role) {
        case "admin":
        return [...globalRoutes, ...testerRoutes]
        case "tester":
        return [...globalRoutes, ...testerRoutes]
        case "performance": 
        return [...globalRoutes, ...performanceRoutes]
        default:
        return [...globalRoutes]
    }
  }
  
