import React from 'react';
import MenuBar from '../components/MenuBar';
import { getBirthYearDirectorTV, getBirthYearWriter, getBirthYearActor, getBirthYearShows, addToWatchlist } from '../fetcher';
import { FormInput, Button } from "shards-react";

import {
  Table,
  Row,
  Col,
  Divider
} from 'antd'

const { Column } = Table;
const showColumns = [
  {
    title: 'TV Show',
    dataIndex: 'TV_Show',
    key: 'TV_Show',
    sorter: (a, b) => a.TV_Show.localeCompare(b.TV_Show)
  },
  {
    title: 'Director',
    dataIndex: 'Director',
    key: 'Director',
    sorter: (a, b) => a.Director.localeCompare(b.Director)
  },
  {
    title: 'Writer',
    dataIndex: 'Writer',
    key: 'Writer',
    sorter: (a, b) => a.Writer.localeCompare(b.Writer)
  },
  {
    title: 'Actor',
    dataIndex: 'Actor',
    key: 'Actor',
    sorter: (a, b) => a.Actor.localeCompare(b.Actor)
  },
  {
    title: 'Start Year',
    dataIndex: 'startYear',
    key: 'startYear',
    sorter: (a, b) => a.startYear - b.startYear
  },
  {
    title: 'End Year',
    dataIndex: 'endYear',
    key: 'endYear',
    sorter: (a, b) => a.endYear - b.endYear
  }
]

class AllShowsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      birthYear: 2000,
      birthyearList: [],
      isChecked: false,
      tid: "",
      birthYearWritersList: [],
      birthYearActorsList: [],
      birthYearShowsList: [],
      watchlist: []
    }
    this.addShowToWatchList = this.addShowToWatchList.bind(this);
    this.handleBirthYearChange = this.handleBirthYearChange.bind(this);
    this.updateBirthYearResults = this.updateBirthYearResults.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  addShowToWatchList(e, tid) {
    addToWatchlist(tid).then(res => {
      this.setState({ watchlist: res.results })
      alert("Show Added to Watchlist");
      e.preventDefault();
    })
  }

  handleBirthYearChange(event) {
    this.setState({ birthYear: event.target.value })
  }

  handleCheckBox() {
    this.setState({ isChecked: !this.state.isChecked })
  }

  updateBirthYearResults() {
    getBirthYearDirectorTV(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthyearList: res.results })
    })

    getBirthYearWriter(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthYearWritersList: res.results })
    })

    getBirthYearActor(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthYearActorsList: res.results })
    })

    getBirthYearShows(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthYearShowsList: res.results })
    })
  }

  componentDidMount() {
    getBirthYearDirectorTV(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthyearList: res.results })
    })

    getBirthYearWriter(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthYearWritersList: res.results })
    })

    getBirthYearActor(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthYearActorsList: res.results })
    })

    getBirthYearShows(this.state.birthYear, this.state.isChecked).then(res => {
      this.setState({ birthYearShowsList: res.results })
    })

    addToWatchlist(null).then(res => {
      this.setState({ watchlist: res.results })
      return false;
    })
  }

  render() {
    const cardStyle = { backgroundColor: "silver", width: "100vw", height: "450vh" }

    return (
      <div>
        <body style={cardStyle}>
          <MenuBar />
          <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
            <Col style={{ width: '30vw' }}>
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "left", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif', marginBottom: '2vh' }}>Enter your birth year:</h5>
              <FormInput value={this.state.birthYear} onChange={this.handleBirthYearChange} />
            </Col>
          </Row>
          <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
            <Col>
              <label>Show TV Shows in English only</label>
            </Col>
            <Col>
              <input type="checkbox" id="language" name="language" value="en" checked={this.state.isChecked} onChange={this.handleCheckBox} />
            </Col>
          </Row>
          <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '1vh' }}>
            <Col>
              <Button style={{ marginTop: '4.5vh', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateBirthYearResults}>Search</Button>
            </Col>
          </Row>
          <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }} >
            <Col style={{ width: '60vw' }} >
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif', marginBottom: '2vh' }}>Shows within your birth year</h5>
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) }};
              }} dataSource={this.state.birthYearShowsList} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Start Year" dataIndex="startYear" key="startYear" sorter={(a, b) => a.startYear - b.startYear} />
                <Column columns={showColumns} title="End Year" dataIndex="endYear" key="endYear" sorter={(a, b) => a.endYear - b.endYear} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif', marginBottom: '2vh' }}>Directors' work who share your birth year</h5>
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { this.addShowToWatchList(event, record.tid) } };
              }} dataSource={this.state.birthyearList} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Director" dataIndex="Director" key="Director" sorter={(a, b) => a.Director.localeCompare(b.Director)} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif', marginBottom: '2vh' }}>Writers' work who share your birth year</h5>
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { this.addShowToWatchList(event, record.tid) }};
              }} dataSource={this.state.birthYearWritersList} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Writer" dataIndex="Writer" key="Writer" sorter={(a, b) => a.Writer.localeCompare(b.Writer)} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif', marginBottom: '2vh' }}>Actors' shows who share your birth year</h5>
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { this.addShowToWatchList(event, record.tid) }};
              }} dataSource={this.state.birthYearActorsList} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Actor" dataIndex="Actor" key="Actor" sorter={(a, b) => a.Actor.localeCompare(b.Actor)} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
            </Col>
          </Row>
        </body>
      </div>
    )
  }
}

export default AllShowsPage


