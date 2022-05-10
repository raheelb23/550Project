import React from 'react';
import { Form, FormGroup, Button } from "shards-react";
import {
  Row,
  Col,
} from 'antd'
import { clearWatchList, getWatchList } from '../fetcher';
class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      watchlist: []
    }
    this.handleGuestSession = this.handleGuestSession.bind(this);
  }

  handleGuestSession() {
    clearWatchList().then(res => {
      getWatchList().then(res => {
        this.setState({ watchlist: res.results })
      })
    })
    window.location = `/basic`
  }
  render() {
    const cardStyle = { backgroundImage: "url(/land2.jpg)", backgroundRepeat: 'no-repeat', backgroundColor: "black", width: "100vw", height: "100vh" }
    return (
      <body style={cardStyle}>
        <h3 style={{ width: '75vw', margin: '0 auto', textAlign: "center", color: "black", fontSize: '1px', fontFamily: 'fantasy' }}> .</h3>
        <h3 style={{ width: '75vw', margin: '0 auto', textAlign: "center", color: "white", fontSize: '40px', fontFamily: 'fantasy', align: "center" }}>The Next Binge</h3>
        <h6 style={{ width: '75vw', margin: '0 auto', marginTop: '2vh', textAlign: "center", color: "white", fontSize: '20px', fontFamily: 'cursive', align: "center" }}>Are you ready for your next binge? Click the button to continue.</h6>
        <Form style={{ width: '100vw', margin: '0 center' }}>
          <Row >
            <Col flex={1}>
              <FormGroup style={{ width: '12vw', margin: '0 auto', align: "center" }}>
                <Button style={{ marginTop: '2vh', textAlign: "center", fontFamily: 'cursive', align: "center", fontSize: '20px', backgroundColor: "gray", border: "black", outline: "black" }} onClick={this.handleGuestSession}>I'm Ready to Binge!</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </body>
    );
  }
}

export default LandingPage


