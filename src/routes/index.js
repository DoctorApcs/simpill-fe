// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';
import Loading from '~/pages/Loading';
import SupplementList from '~/pages/Supplements/SupplementList';
import Supplement from '~/pages/Supplements/Supplement';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bodymap', component: BodyMap },
    { path: '/loading', component: Loading },
    { path: '/supplements', component: SupplementList },
    { path: '/supplements/:name', component: Supplement },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
