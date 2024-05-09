// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';
import Loading from '~/pages/Loading';
import Supplements from '~/pages/Subpplements';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bodymap', component: BodyMap },
    { path: '/loading', component: Loading },
    { path: '/supplements', component: Supplements },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
