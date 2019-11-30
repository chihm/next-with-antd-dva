import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

import WithDva from '../store';
import css from './_app.less';

const { Header, Content } = Layout;

class MyApp extends App {
  static async getInitialProps({ ctx }) {
    const {
      pathname, query, isServer, store,
    } = ctx;

    // 如果有必要，这里可以做一些初始化store的事情

    return {
      pathname, query, isServer, store,
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Layout className={css.layout}>
          <Header>
            <div className={css.logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link href="/"><a>Home</a></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/about"><a>About</a></Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </Provider>
    );
  }
}

export default WithDva(MyApp);
