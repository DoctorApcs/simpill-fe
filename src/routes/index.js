// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';
import Loading from '~/pages/Loading';
import Subpplements from '~/pages/Subpplements';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bodymap', component: BodyMap },
    { path: '/loading', component: Loading },
    { path: '/subpplements', component: Subpplements },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
