import React from 'react';
import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { ServerRouter, StaticRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { JssProvider, SheetsRegistry } from 'react-jss'
import configureStore from './store/configureStore';

import Router from './routes';
import Root from './containers/Root.prod';

const store = configureStore();
/*
const history = syncHistoryWithStore(createBrowserHistory(), store, {
  selectLocationState(state) {
    console.log('----', state.get('routing').toJS());
    return state.get('routing').toJS();
  }
});
*/
function renderFullHTMLPage(stringifyHTML, initialState) {
  return `<!doctype html>${renderToStaticMarkup(
    <html>
      <head>
        <title>server side rendering</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: stringifyHTML }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)};` }}></script>
        <link rel="stylesheet" type="text/css" href="/bootstrap.min.css" />
        <script type="text/javascript" src="/dist-production.js"></script>
        <link rel="stylesheet" type="text/css" href="/bootstrap.min.css" />
        <style dangerouslySetInnerHTML={{__html: `
          body {
            font-family: ExoRegular !important;
          }
        `}} />
      </body>
    </html>
  )}`;
}


function renderContent(path) {
  const context = {};
  const sheets = new SheetsRegistry();

  const html = renderToString(
    <JssProvider registry={sheets}>
      <Root location={'/'} context={context} store={store} />
    </JssProvider>
  );

  return { html: renderFullHTMLPage(html, {}), css: sheets.toString() };
}

const app = new Koa();

app.use(serve('node_modules/bootstrap/dist/css/'));
app.use(serve('app/static/fonts/'));
app.use(serve('dist/'));

app.use(async ctx => {
  const { path } = ctx;

  const { html, css } = renderContent(path);

  if (path === '/styles.css') {
    ctx.type = 'css';
    ctx.body = css;
  } else {
    ctx.body = html;
  }
});

app.listen(3001);
console.log('👾 App listen port 3001');
