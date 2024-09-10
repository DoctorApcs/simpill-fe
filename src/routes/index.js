import config from '~/config';

// Pages
import BodyMap from '~/pages/BodyMap';
import Home from '~/pages/Home';
import SupplementList from '~/pages/Supplements/SupplementList';
import Supplement from '~/pages/Supplements/Supplement';
import Drug from '~/pages/Drugs/Drug';
import DrugDetail from '~/pages/Drugs/DrugDetail';
import Tabs from '~/pages/Tabs';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.bodymap, component: BodyMap },
    { path: config.routes.tabs, component: Tabs },
    { path: config.routes.supplements, component: SupplementList },
    { path: config.routes.supplement, component: Supplement },
    { path: config.routes.drug, component: Drug },
    { path: config.routes.drugDetail, component: DrugDetail }
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
