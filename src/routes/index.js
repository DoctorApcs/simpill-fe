// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bodymap', component: BodyMap },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
