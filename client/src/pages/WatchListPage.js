import React from 'react';
import MenuBar from '../components/MenuBar';
import { Button } from "shards-react";
import {
  Table,
  Row
} from 'antd'
import { clearWatchList, getWatchList, removeFromWatchlist } from '../fetcher';
const { Column } = Table;
const showColumns = [
  {
    title: 'TV Show',
    dataIndex: 'TV_Show',
    key: 'TV_Show',
    sorter: (a, b) => a.TV_Show.localeCompare(b.TV_Show)
  }]

class WatchListPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tid: null,
      watchlist: []
    }
    this.clear = this.clear.bind(this);
    this.removeEntryFromWatchList = this.removeEntryFromWatchList.bind(this);
    this.loadAll = this.loadAll.bind(this);
  }

  clear() {
    clearWatchList().then(res => {
      alert("Watchlist Cleared");
      getWatchList().then(res => {
        this.setState({ watchlist: res.results })
      })
    })
  }

  loadAll() {
    getWatchList().then(res => {
      this.setState({ watchlist: res.results })
    })
  }

  removeEntryFromWatchList(event, value) {

    removeFromWatchlist(value).then(res => {
      alert("Show Removed from Watchlist");
    })

    getWatchList().then(res => {
      this.setState({ watchlist: res.results })
    })

  }

  componentDidMount() {
    getWatchList().then(res => {
      this.setState({ watchlist: res.results })
    })

    removeFromWatchlist(null).then(res => {
      this.setState({ watchlist: res.results })
      alert("Show Removed from Watchlist");
    })
  }
  render() {
    const cardStyle = { backgroundImage: "url(/landing_image.jpg)", backgroundRepeat: 'no-repeat', backgroundColor: "black", width: "100vw", height: "50vh" }
    const bodyStyle = { backgroundColor: "silver", width: "100vw", height: "300vh" }
    return (
      <body style={bodyStyle}>
        <div style={cardStyle}>
          <MenuBar />
          <Row style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
            <Button style={{ marginTop: '4.5vh', width: '25vw', margin: '0 auto', backgroundColor: "gray", border: "black", outline: "black" }} onClick={this.clear}>Clear WatchList</Button>
          </Row>
          <div style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
            <Table onRow={(record, rowIndex) => {
              return {
                onClick: event => { this.removeEntryFromWatchList(event, record.tid); this.loadAll(); } };
            }} dataSource={this.state.watchlist} pagination={{ pageSizeOptions: [10, 15], defaultPageSize: 10, showQuickJumper: true }}>
              <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
              <Column columns={showColumns} title="" dataIndex="Remove" key="Remove" />
            </Table>
            <div>
            </div>
          </div>
        </div>
      </body>
    )
  }
}

export default WatchListPage


