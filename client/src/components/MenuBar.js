import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "shards-react";

class MenuBar extends React.Component {
  render() {
    //const myStyle = {backgroundImage: "url(/land2.jpg)", height: '100vh', backgroundSize: 'cover'};

    return (
      //<body style = {myStyle}>
      <Navbar type="dark" theme="secondary" expand="lg" >
        <NavbarBrand href="/">The Next Binge</NavbarBrand>
        <Nav navbar>
          <NavItem><NavLink active href="/basic">Basic Search</NavLink></NavItem>
          <NavItem><NavLink active href="/shows">Shows by Birth Year</NavLink></NavItem>
          <NavItem><NavLink active href="/advancedsearch">Advanced Search</NavLink></NavItem>
          <NavItem><NavLink active href="/watchlist">WatchList</NavLink></NavItem>
        </Nav>
      </Navbar>
      //</body>
    )
  }
}

export default MenuBar

