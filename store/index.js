import React from 'react';
import dva from 'dva-no-router';
import models from './modules/index';

const checkServer = () => typeof window === 'undefined';

const __NEXT_DVA_STORE__ =  '__NEXT_DVA_STORE__';

function createDvaStore(initialState) {
  let app;
  if (initialState) {
    app = dva({
      initialState,
    });
  } else {
    app = dva({});
  }
  const isArray = Array.isArray(models);
  if (isArray) {
    models.forEach((m) => {
      app.model(m);
    });
  } else {
    app.model(models);
  }
  app.router(() => {});
  app.start();
  
  const store = app._store;

  return store;
}

function getOrCreateStore(initialState) {
  const isServer = checkServer();
  if (isServer) {
    return createDvaStore(initialState);
  }

  if (!window[__NEXT_DVA_STORE__]) {
    window[__NEXT_DVA_STORE__] = createDvaStore(initialState);
  }
  
  return window[__NEXT_DVA_STORE__];
}

export default function withDva(App) {
  return class AppWithDva extends React.Component {
    static async getInitialProps(appContext) {
      const store = getOrCreateStore(appContext.req);
      appContext.ctx.store = store;

      let appProps = {};

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialState: store.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.store = getOrCreateStore(props.initialState);
    }

    render () {
      return <App {...this.props} store={this.store} />
    }
  }
}