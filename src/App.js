import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.id} element={route.component} path={route.path} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;
