import LandingPage from '../pages/LandingPage';
import Article from '../pages/Article';
import AllNews from '../pages/AllNews';

const routes = [
  { id: 0, path: '/', component: <LandingPage /> },
  { id: 1, path: '/article', component: <Article /> },
  { id: 2, path: '/allnews', component: <AllNews /> },
];

export default routes;
