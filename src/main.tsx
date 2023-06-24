import { createRoot } from 'react-dom/client';
import './global.css';

import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './Routes';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Router>
    <AllRoutes />
  </Router>
);
