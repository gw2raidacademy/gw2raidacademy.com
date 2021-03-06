import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'routes/Layout';
import '!!style-loader!css-loader!armory-component-ui/styles.css';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
