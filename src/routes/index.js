import config from '~/config';

// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';
import SupplementList from '~/pages/Supplements/SupplementList';
import Supplement from '~/pages/Supplements/Supplement';
import FruitDrug from '~/pages/Fruits&Drugs/FruitDrug';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.bodymap, component: BodyMap },
    { path: config.routes.supplements, component: SupplementList },
    { path: config.routes.supplement, component: Supplement },
    { path: config.routes.drug, component: FruitDrug },
    // { path: '/fruit/:name', component:  },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
