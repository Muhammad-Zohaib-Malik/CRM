import  { useState } from 'react';
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,

} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const menus=[
  {
    key:'dashboard',
    label:<Link to="/app/dashboard">Dashboard</Link>,
    icon:<DashboardOutlined />,
  },
  {
    key:'customers',
    label:<Link to="/app/customer">Customers</Link>,
    icon:<UserOutlined />,
  },
  {
    key:'Calls & Logs',
    label:<Link to="/app/logs">Calls & Logs</Link>,
    icon:<PieChartOutlined />
  }

]
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className='!min-h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={menus
          }
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;