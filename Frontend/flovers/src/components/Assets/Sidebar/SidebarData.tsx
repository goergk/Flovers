import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import GrassIcon from '@mui/icons-material/Grass';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { PageType } from '../../Pages/Current Page/PageType';

export const SidebarData = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        path: `${PageType.FLOWERS}`,
    },
    {
        title: 'Resources',
        icon: <WarehouseIcon />,
        path: `${PageType.RESOURCES}`
    },
    {
        title: 'Deliveries',
        icon: <AssignmentIcon />,
        path: `${PageType.DELIVERIES}`
    },
    {
        title: 'Compose',
        icon: <GrassIcon />,
        path: `${PageType.COMPOSITIONS}`
    },
    {
        title: 'Sales',
        icon: <MonetizationOnIcon />,
        path: `${PageType.SALES}`
    },
    {
        title: 'Statistics',
        icon: <AssessmentIcon />,
        path: `${PageType.STATISTICS}`
    },
]