// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';
import Loading from '~/pages/Loading';
import Supplements from '~/pages/Subpplements';
import Supplement from '~/pages/Subpplements/Supplement';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bodymap', component: BodyMap },
    { path: '/loading', component: Loading },
    { path: '/supplements', component: Supplements },
    { path: '/supplements/:name', component: Supplement },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
