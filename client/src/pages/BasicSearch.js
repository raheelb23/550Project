import React from 'react';
import MenuBar from '../components/MenuBar';
import {
  getAllShows, getAllShowsBasedOnRating, getLongestRunningTVShow, getGenreTVWriter,
  getShowsBasedOnRuntime, getCastSize, directorInXShows, addToWatchlist
} from '../fetcher';
import { FormInput, Button } from "shards-react";

import {
  Table,
  Row,
  Col,
  Divider,
  Select
} from 'antd'

const { Column } = Table;
const { Option } = Select;
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
    title: 'Years',
    dataIndex: 'Years',
    key: 'Years',
    sorter: (a, b) => a.Years - b.Years
  },
  {
    title: 'Writer',
    dataIndex: 'Writer',
    key: 'Writer',
    sorter: (a, b) => a.Writer.localeCompare(b.Writer)
  },
  {
    title: 'Director',
    dataIndex: 'Director',
    key: 'Director',
    sorter: (a, b) => a.Director.localeCompare(b.Director)
  },
  {
    title: 'Runtime (Minutes)',
    dataIndex: 'Runtime',
    key: 'Runtime',
    sorter: (a, b) => a.Runtime - b.Runtime
  },
  {
    title: 'Shows Directed',
    dataIndex: 'numShows',
    key: 'numShows',
    sorter: (a, b) => a.numShows - b.numShows
  },
  {
    title: 'Cast Size',
    dataIndex: 'size',
    key: 'size',
    sorter: (a, b) => a.size - b.size
  }
]

class BasicSearch extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      allShowsResults: [],
      allShowsResultsWithRating: [],
      resultsRuntimeMinutes: [],
      longestRunningResults: [],
      castSizeResults: [],
      directorInXResults: [],
      watchlist: [],
      genreWriters: [],
      minRating: 0,
      maxRating: 10,
      minYears: 1,
      maxYears: 75,
      minRuntime: 0,
      maxRuntime: 5000,
      minCast: 1,
      maxCast: 60,
      genre: "Action",
      minSize: 1,
      director: ""
    }
    this.addShowToWatchList = this.addShowToWatchList.bind(this);
    this.handleMinRatingChange = this.handleMinRatingChange.bind(this);
    this.handleMaxRatingChange = this.handleMaxRatingChange.bind(this);
    this.updateRatingResults = this.updateRatingResults.bind(this);
    this.handleMinYearsChange = this.handleMinYearsChange.bind(this);
    this.handleMaxYearsChange = this.handleMaxYearsChange.bind(this);
    this.updateLongestRunning = this.updateLongestRunning.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.updateGenreWritersResults = this.updateGenreWritersResults.bind(this);
    this.handleMinRuntimeChange = this.handleMinRuntimeChange.bind(this);
    this.handleMaxRuntimeChange = this.handleMaxRuntimeChange.bind(this);
    this.updateRuntimeResults = this.updateRuntimeResults.bind(this);
    this.handleMinCastChange = this.handleMinCastChange.bind(this);
    this.handleMaxCastChange = this.handleMaxCastChange.bind(this);
    this.updateCastResults = this.updateCastResults.bind(this);
    this.handleDirectorChange = this.handleDirectorChange.bind(this);
    this.handleMinSizeChange = this.handleMinSizeChange.bind(this);
    this.updateDirectorInXResults = this.updateDirectorInXResults.bind(this);
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

  handleMinYearsChange(event) {
    this.setState({ minYears: event.target.value })
  }

  handleMaxYearsChange(event) {
    this.setState({ maxYears: event.target.value })
  }

  handleGenreChange(value) {
    this.setState({ genre: value })
  }

  handleMinRuntimeChange(event) {
    this.setState({ minRuntime: event.target.value })
  }

  handleMaxRuntimeChange(event) {
    this.setState({ maxRuntime: event.target.value })
  }

  handleMinCastChange(event) {
    this.setState({ minCast: event.target.value })
  }

  handleMaxCastChange(event) {
    this.setState({ maxCast: event.target.value })
  }

  handleDirectorChange(event) {
    this.setState({ director: event.target.value })
  }

  handleMinSizeChange(event) {
    this.setState({ minSize: event.target.value })
  }

  updateRuntimeResults() {
    getShowsBasedOnRuntime(this.state.minRuntime, this.state.maxRuntime).then(res => {
      this.setState({ resultsRuntimeMinutes: res.results })
    })
  }

  updateRatingResults() {
    getAllShowsBasedOnRating(this.state.minRating, this.state.maxRating).then(res => {
      this.setState({ allShowsResultsWithRating: res.results })
    })
  }

  updateLongestRunning() {
    getLongestRunningTVShow(this.state.minYears, this.state.maxYears).then(res => {
      this.setState({ longestRunningResults: res.results })
    })
  }

  updateGenreWritersResults() {
    console.log(this.state.genre);
    getGenreTVWriter(this.state.genre).then(res => {
      this.setState({ genreWriters: res.results })
    })
  }

  updateCastResults() {
    getCastSize(this.state.minCast, this.state.maxCast).then(res => {
      this.setState({ castSizeResults: res.results })
    })
  }

  updateDirectorInXResults() {
    directorInXShows(this.state.director, this.state.minSize).then(res => {
      this.setState({ directorInXResults: res.results })
    })
  }

  componentDidMount() {
    getAllShows().then(res => {
      this.setState({ allShowsResults: res.results })
    })

    getAllShowsBasedOnRating(this.state.minRating, this.state.maxRating).then(res => {
      this.setState({ allShowsResultsWithRating: res.results })
    })

    getLongestRunningTVShow(this.state.minYears, this.state.maxYears).then(res => {
      this.setState({ longestRunningResults: res.results })
    })

    getGenreTVWriter(this.state.genre).then(res => {
      this.setState({ genreWriters: res.results })
    })

    getShowsBasedOnRuntime(this.state.minRuntime, this.state.maxRuntime).then(res => {
      this.setState({ resultsRuntimeMinutes: res.results })
    })

    getCastSize(this.state.minCast, this.state.maxCast).then(res => {
      this.setState({ castSizeResults: res.results })
    })

    directorInXShows(this.state.director, this.state.minSize).then(res => {
      this.setState({ directorInXResults: res.results })
    })

    addToWatchlist(null).then(res => {
      this.setState({ watchlist: res.results })
      return false;
    })
  }

  render() {
    const cardStyle = { backgroundColor: "silver", width: "100vw", height: "1000vh" }

    return (
      <div>
        <body style={cardStyle}>
          <MenuBar />
          <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }} >
            <Col style={{ width: '60vw' }} >
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif', marginBottom: '2vh' }}>All TV Shows</h5>
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) } };
              }} dataSource={this.state.allShowsResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif' }}>Shows based on Rating</h5>
              <Col style={{ width: '44vw', fontSize: '20px', textAlign: "right", color: "dark gray", fontFamily: "sans-serif" }}>
              <label> Please enter a minimum and maximum rating</label>
            </Col>
              <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', color: "dark gray", fontSize: '20px', fontFamily: 'cursive' }}>
                <Col style={{ width: '30vw' }}>
                  <label>Minimum Rating</label>
                  <FormInput placeholder="Minimum Rating" value={this.state.minRating} onChange={this.handleMinRatingChange} />
                </Col>
                <Col style={{ width: '30vw' }}>
                  <label>Maximum Rating</label>
                  <FormInput placeholder="Maximum Rating" value={this.state.maxRating} onChange={this.handleMaxRatingChange} />
                </Col>
                <Col>
                  <Button style={{ marginTop: '4.5vh', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateRatingResults}>Search</Button>
                </Col>
              </Row>
              <br />
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) } };
              }} dataSource={this.state.allShowsResultsWithRating} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Rating" dataIndex="Rating" key="Rating" sorter={(a, b) => a.Rating - b.Rating} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif' }}>Longest Running TV Shows</h5>
              <Col style={{ width: '43vw', fontSize: '20px', textAlign: "right", color: "dark gray", fontFamily: "sans-serif"}}>
              <label> Please enter a minimum and maximum year</label>
            </Col>
              <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', color: "dark gray", fontSize: '20px', fontFamily: 'cursive' }}>
                <Col style={{ width: '30vw' }}>
                  <label>Minimum Years</label>
                  <FormInput value={this.state.minYears} onChange={this.handleMinYearsChange} />
                </Col>
                <Col style={{ width: '30vw' }}>
                  <label>Maximum Years</label>
                  <FormInput value={this.state.maxYears} onChange={this.handleMaxYearsChange} />
                </Col>
                <Col>
                  <Button style={{ marginTop: '4.5vh', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateLongestRunning}>Search</Button>
                </Col>
              </Row>
              <br />
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) } };
              }} dataSource={this.state.longestRunningResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Years" dataIndex="Years" key="Years" sorter={(a, b) => a.Years - b.Years} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif' }}>Writers of a TV Show Genre</h5>
              <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', color: "dark gray", fontSize: '20px', fontFamily: 'cursive' }}>
                <Col>
                  <label style={{ width: '5vw', marginTop: '1vh' }}>Genre </label>
                  <Select defaultValue="Action" style={{ width: '30vw', marginTop: '1vh' }} onChange={this.handleGenreChange}>
                    <Option value="Action">Action</Option>
                    <Option value="Adult">Adult</Option>
                    <Option value="Adventure">Adventure</Option>
                    <Option value="Animation">Animation</Option>
                    <Option value="Biography">Biography</Option>
                    <Option value="Comedy">Comedy</Option>
                    <Option value="Crime">Crime</Option>
                    <Option value="Documentary">Documentary</Option>
                    <Option value="Drama">Drama</Option>
                    <Option value="Family">Family</Option>
                    <Option value="Fantasy">Fantasy</Option>
                    <Option value="Film-Noir">Film-Noir</Option>
                    <Option value="Game-Show">Game-Show</Option>
                    <Option value="History">History</Option>
                    <Option value="Horror">Horror</Option>
                    <Option value="Music">Music</Option>
                    <Option value="Musical">Musical</Option>
                    <Option value="Mystery">Mystery</Option>
                    <Option value="News">News</Option>
                    <Option value="Reality-TV">Reality-TV</Option>
                    <Option value="Romance">Romance</Option>
                    <Option value="Sci-Fi">Sci-Fi</Option>
                    <Option value="Short">Short</Option>
                    <Option value="Sport">Sport</Option>
                    <Option value="Talk-Show">Talk-Show</Option>
                    <Option value="Thriller">Thriller</Option>
                    <Option value="War">War</Option>
                    <Option value="Western">Western</Option>
                  </Select>
                </Col>
                <Col>
                  <Button style={{ marginTop: '0vh', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateGenreWritersResults}>Search</Button>
                </Col>
              </Row>
              <br />
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) }};
              }} dataSource={this.state.genreWriters} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Writer" dataIndex="Writer" key="Writer" sorter={(a, b) => a.Writer.localeCompare(b.Writer)} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif' }}>Shows based on Runtime (Minutes)</h5>
              <Col style={{ width: '43vw', fontSize: '20px', textAlign: "right", color: "dark gray", fontFamily: "sans-serif"}}>
              <label> Please enter a minimum and maximum runtime</label>
            </Col>
              <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', color: "dark gray", fontSize: '20px', fontFamily: 'cursive' }}>
                <Col style={{ width: '30vw' }}>
                  <label>Minimum Runtime</label>
                  <FormInput value={this.state.minRuntime} onChange={this.handleMinRuntimeChange} />
                </Col>
                <Col style={{ width: '30vw' }}>
                  <label>Maximum Runtime</label>
                  <FormInput value={this.state.maxRuntime} onChange={this.handleMaxRuntimeChange} />
                </Col>
                <Col>
                  <Button style={{ marginTop: '4.5vh', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateRuntimeResults}>Search</Button>
                </Col>
              </Row>
              <br />
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) } };
              }} dataSource={this.state.resultsRuntimeMinutes} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Runtime (Minutes)" dataIndex="Runtime" key="Runtime" sorter={(a, b) => a.Runtime - b.Runtime} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif' }}>Shows with Cast size of</h5>
              <Col style={{ width: '44vw', fontSize: '20px', textAlign: "right", color: "dark gray", fontFamily: "sans-serif"}}>
              <label> Please enter a minimum and maximum cast size</label>
            </Col>
              <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', color: "dark gray", fontSize: '20px', fontFamily: 'cursive' }}>
                <Col style={{ width: '30vw' }}>
                  <label>Minimum Cast Size</label>
                  <FormInput value={this.state.minCast} onChange={this.handleMinCastChange} />
                </Col>
                <Col style={{ width: '30vw' }}>
                  <label>Maximum Cast Size</label>
                  <FormInput value={this.state.maxCast} onChange={this.handleMaxCastChange} />
                </Col>
                <Col>
                  <Button style={{ marginTop: '4.5vh', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateCastResults}>Search</Button>
                </Col>
              </Row>
              <br />
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) }};
              }} dataSource={this.state.castSizeResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Cast Size" dataIndex="size" key="size" sorter={(a, b) => a.size - b.size} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
              <Divider />
              <h5 style={{ width: '60vw', margin: '0 auto', textAlign: "center", color: "dark gray", fontSize: '30px', fontFamily: 'sans-serif' }}>Directors with most number of shows</h5>
              <Col style={{ width: '50vw', fontSize: '20px', textAlign: "right", color: "dark gray", fontFamily: "sans-serif"}}>
              <label> Please enter a Director name and minimum number of shows directed</label>
            </Col>
              <Row gutter='20' style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', color: "dark gray", fontSize: '20px', fontFamily: 'cursive' }}>
                <Col style={{ width: '30vw' }}>
                  <label>Director name</label>
                  <FormInput value={this.state.director} onChange={this.handleDirectorChange} />
                </Col>
                <Col style={{ width: '30vw' }}>
                  <label>Minimum number of shows directed</label>
                  <FormInput value={this.state.minSize} onChange={this.handleMinSizeChange} />
                </Col>
                <Col>
                  <Button style={{ marginTop: '4.5vh', backgroundColor: "black", border: "black", outline: "black" }} onClick={this.updateDirectorInXResults}>Search</Button>
                </Col>
              </Row>
              <br />
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { event.preventDefault(); this.addShowToWatchList(event, record.tid) }};
              }} dataSource={this.state.directorInXResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                <Column columns={showColumns} title="TV Show" dataIndex="TV_Show" key="TV_Show" sorter={(a, b) => a.TV_Show.localeCompare(b.TV_Show)} />
                <Column columns={showColumns} title="Director" dataIndex="Director" key="Director" sorter={(a, b) => a.Director.localeCompare(b.Director)} />
                <Column columns={showColumns} title="Shows Directed" dataIndex="numShows" key="numShows" sorter={(a, b) => a.numShows - b.numShows} />
                <Column columns={showColumns} title="" dataIndex="Watch" key="Watch" />
              </Table>
            </Col>
          </Row>
        </body>
      </div>
    )
  }
}

export default BasicSearch


