// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';
import Loading from '~/pages/Loading';
import SupplementList from '~/pages/Supplements/SupplementList';
import Supplement from '~/pages/Supplements/Supplement';
import FruitDrug from '~/pages/Fruits&Drugs/FruitDrug';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bodymap', component: BodyMap },
    { path: '/loading', component: Loading },
    { path: '/supplements', component: SupplementList },
    { path: '/supplements/:name', component: Supplement },
    { path: '/drug/:name', component: FruitDrug },
    // { path: '/fruit/:name', component:  },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
