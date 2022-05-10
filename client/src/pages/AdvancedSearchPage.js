import React from 'react';
import MenuBar from '../components/MenuBar';
import { getShowsBasedOnUser, addToWatchlist } from '../fetcher';
import { FormInput, Button } from "shards-react";

import {
  Table,
  Row,
  Col,
  Divider,
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
    title: 'Rating',
    dataIndex: 'Rating',
    key: 'Rating',
    sorter: (a, b) => a.Rating - b.Rating
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
  },
  {
    title: 'Director',
    dataIndex: 'Director',
    key: 'Director',
    sorter: (a, b) => a.Director.localeCompare(b.Director)
  },
  {
    title: 'Actor / Actress',
    dataIndex: 'Actor',
    key: 'Actor',
    sorter: (a, b) => a.Actor.localeCompare(b.Actor)
  }
]

class AdvancedSearchPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      allShowsResults: [],
      watchlist: [],
      minRating: 0,
      maxRating: 10,
      startYear: 1900,
      endYear: 2022,
      director: "",
      actor: ""
    }
    this.loadAll = this.loadAll.bind(this);
    this.addShowToWatchList = this.addShowToWatchList.bind(this);
    this.handleMinRatingChange = this.handleMinRatingChange.bind(this);
    this.handleMaxRatingChange = this.handleMaxRatingChange.bind(this);
    this.handleStartYearChange = this.handleStartYearChange.bind(this);
    this.handleEndYearChange = this.handleEndYearChange.bind(this);
    this.handleActorChange = this.handleActorChange.bind(this);
    this.handleDirectorChange = this.handleDirectorChange.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  addShowToWatchList(e, tid) {
    addToWatchlist(tid).then(res => {
      this.setState({ watchlist: res.results })
      alert("Show Added to Watchlist");
      e.preventDefault();
    })
  }

  handleMinRatingChange(event) {
    this.setState({ minRating: event.target.value })
  }

  handleMaxRatingChange(event) {
    this.setState({ maxRating: event.target.value })
  }

  handleStartYearChange(event) {
    this.setState({ startYear: event.target.value })
  }

  handleEndYearChange(event) {
    this.setState({ endYear: event.target.value })
  }

  handleActorChange(event) {
    this.setState({ actor: event.target.value })
  }

  handleDirectorChange(event) {
    this.setState({ director: event.target.value })
  }

  updateResults() {
    getShowsBasedOnUser(this.state.minRating, this.state.maxRating, this.state.director, this.state.actor, this.state.startYear, this.state.endYear).then(res => {
      this.setState({ allShowsResults: res.results })
    })
  }

  loadAll() {
    getShowsBasedOnUser().then(res => {
      this.setState({ allShowsResults: res.results })
    })

  }
  componentDidMount() {
    getShowsBasedOnUser().then(res => {
      this.setState({ allShowsResults: res.results })
    })

    addToWatchlist(null).then(res => {
      this.setState({ watchlist: res.results })
      return false;
    })

  }

  render() {
    const cardStyle = { backgroundColor: "silver", width: "100vw", height: "300vh" }
    return (
      <div>
        <body style={cardStyle}>
          <MenuBar />
          <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }} >
            <Col style={{ width: '60vw' }} >
              <h5 style={{ color: "dark gray", fontSize: '40px', fontFamily: 'sans-serif' }}>Advanced Search</h5>
              <Divider />
              <h5 style={{ color: "dark gray", fontSize: '26px', fontFamily: 'sans-serif' }}>Enter one or many attributes to search for TV Shows</h5>
              <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                <Col style={{ width: '12vw', color: "dark gray", fontSize: '16px', fontFamily: 'cursive' }}>
                  <label>Minimum Rating</label>
                  <FormInput placeholder="Minimum Rating" value={this.state.minRating} onChange={this.handleMinRatingChange} />
                </Col>
                <Col style={{ width: '12vw', color: "dark gray", fontSize: '16px', fontFamily: 'cursive' }}>
                  <label>Maximum Rating</label>
                  <FormInput placeholder="Maximum Rating" value={this.state.maxRating} onChange={this.handleMaxRatingChange} />
                </Col>
                <Col style={{ width: '12vw', color: "dark gray", fontSize: '16px', fontFamily: 'cursive' }}>
                  <label>Director Name</label>
                  <FormInput placeholder="Name" value={this.state.director} onChange={this.handleDirectorChange} />
                </Col>
                <Col style={{ width: '12vw', color: "dark gray", fontSize: '16px', fontFamily: 'cursive' }}>
                  <label>Actor/Actress Name</label>
                  <FormInput placeholder="Name" value={this.state.actor} onChange={this.handleActorChange} />
                </Col>
                <Col style={{ width: '12vw', color: "dark gray", fontSize: '16px', fontFamily: 'cursive' }}>
                  <label>Start Year of Show</label>
                  <FormInput placeholder="Start Year of Show" value={this.state.startYear} onChange={this.handleStartYearChange} />
                </Col>
                <Col style={{ width: '12vw', color: "dark gray", fontSize: '16px', fontFamily: 'cursive' }}>
                  <label>End Year of Show</label>
                  <FormInput placeholder="End Year of Show" value={this.state.endYear} onChange={this.handleEndYearChange} />
                </Col>
                <Divider />
                <Col>
                  <Button style={{ marginTop: '5vh', width: '14vw', textAlign: "center", fontFamily: 'fantasy', fontSize: '16px', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateResults}>Search</Button>
                </Col>
              </Row>
              <Divider />
              <br />
              <Table onRow={(record, rowIndex) => {
                return {
                  onLoad: event => { this.loadAll() }, onClick: event => { this.addShowToWatchList(event, record.tid) }};
              }} dataSource={this.state.allShowsResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Director" dataIndex="Director" key="Director" sorter={(a, b) => a.Director.localeCompare(b.Director)} />
                <Column columns={showColumns} title="Actor / Actress" dataIndex="Actor" key="Actor" sorter={(a, b) => a.Actor.localeCompare(b.Actor)} />
                <Column columns={showColumns} title="Rating" dataIndex="Rating" key="Rating" sorter={(a, b) => a.Rating - b.Rating} />
                <Column columns={showColumns} title="Start Year" dataIndex="startYear" key="startYear" sorter={(a, b) => a.startYear - b.startYear} />
                <Column columns={showColumns} title="End Year" dataIndex="endYear" key="endYear" sorter={(a, b) => a.endYear - b.endYear} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <Divider />
            </Col>
          </Row>
        </body>
      </div>
    )
  }
}

export default AdvancedSearchPage


