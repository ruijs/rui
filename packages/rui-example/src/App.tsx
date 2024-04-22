import { HashRouter, Route, Routes } from 'react-router-dom';

import Layout from './layout';
import Container from './container';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={Container}>
          <Route path="/:pkgName/:funcName" Component={Layout} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
