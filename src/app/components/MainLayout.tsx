import React from 'react';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider 
    // collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key={'users'}> <Link href={"/"}>Users</Link></Menu.Item>
        <Menu.Item  key={'times'}><Link href={"/ot-cal"}>OT Calculator</Link></Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }} />
      <Content style={{ margin: '0 16px' }}>
        {children}
        {/* <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Bill is a cat.
        </div> */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
  )
}

export default MainLayout