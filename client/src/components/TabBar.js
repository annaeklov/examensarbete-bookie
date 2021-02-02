import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiSearch, HiOutlineUser, HiOutlineUsers } from "react-icons/hi";

function TabBar() {
  return (
    <TabBarDiv>
      <NavLink
        to="/user"
        activeClassName="selected"
        style={style}
        activeStyle={activeStyle}
      >
        <HiOutlineUser />
{/*         <span>profil</span>
 */}      </NavLink>
      <NavLink
        to="/bookclubs"
        activeClassName="selected"
        style={style}
        activeStyle={activeStyle}
      >
        <HiOutlineUsers />
{/*         <span>bokklubb</span>
 */}      </NavLink>
      <NavLink
        to="/search"
        activeClassName="selected"
        style={style}
        activeStyle={activeStyle}
      >
        <HiSearch />
{/*         <span>sök</span>
 */}      </NavLink>
    </TabBarDiv>
  );
}

export default TabBar;

const TabBarDiv = styled.nav`
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px 5px 0 0;
  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 10px;
    }
    svg {
      font-size: 30px;
    }
  }
`;
const style = {
  color: "#BCBBB5",
};

const activeStyle = {
  color: "#262824",
};
