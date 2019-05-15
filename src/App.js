import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import { Layout, Menu, Icon, Breadcrumb, Row, Col} from 'antd';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Sensor from './components/sensor';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      collapsed: false,      
      loading: false,
    };

  }

  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="profile" />
                  <span>Sensor</span>
                </Link>
              </Menu.Item>                             
            </Menu>
          </Header>
          <Content>
            <Row>
              <Col xs={{ span: 24, offset: 0 }} md={{ span: 18, offset: 3 }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                  <Route exact path="/" component={Sensor} />
                </div>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Bosch - Challenge</Footer>
        </Layout>

      </Router>
    );
  }
}

export default App;
