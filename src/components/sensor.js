import React from 'react';
import { Table, Divider, Tag, Button,Input, Icon } from 'antd';

class Sensor extends React.Component {
  state = {
    sensor: [],
    loading: false,
  };

  componentDidMount() {
   // this.updateData();
  }

  formatData(data) {
    data.forEach(row => { 
      row.key = row._id;
      row.scanDate = new Date(row.scanDate).toLocaleString()
    });
    this.setState({
      loading: false,
      sensor: data
    });
  }

  updateData = (e) => {
    if (e) e.preventDefault();

    this.setState({
      loading: true,
    });

    //local test to avoid cross-site
    /*let urlcors = 'https://cors-anywhere.herokuapp.com/';
    let service = "http://boschchallengeapi.appspot.com/sensorScans"
    fetch(urlcors + service)
      .then(response => response.json())      
      .then(data => this.formatData(data));*/

    let service = "http://boschchallengeapi.appspot.com/sensorScans"
    fetch(service)
      .then(response => response.json())      
      .then(data => this.formatData(data));
  }


  state = {
    searchText: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },   
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

   columns = [
   
    {
      title: 'Sensor',
      dataIndex: 'sensorId',
      key: 'sensorId',
      sorter: (a, b) => a.sensorId - b.sensorId,
      sortDirections: ['descend'],
      ...this.getColumnSearchProps('sensorId'),
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      key: 'temperature',
      sorter: (a, b) => a.temperature - b.temperature,
      sortDirections: ['descend'],
      ...this.getColumnSearchProps('temperature'),
    },
    {
      title: 'Date Scan',
      dataIndex: 'scanDate',
   
    },
    {
      title: 'Latitude',
      dataIndex: 'geometry.coordinates[0]',   
    },
    {
      title: 'Longitude',
      dataIndex: 'geometry.coordinates[1]',
   
    }
  ];
  


  render() {
    return (
      <div>
        <Button type="primary" loading={this.state.loading}  onClick={this.updateData}>
          Retrive Scans
        </Button>               
        
        <Table columns={this.columns} dataSource={this.state.sensor} />
      </div>
    );
  }
}

export default Sensor;