import React from 'react';
import Layout from './components/layout'
import Main from './pages/Main'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/product/:id" component={Product} />
        </Switch>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
