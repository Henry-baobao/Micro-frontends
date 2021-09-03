import React from "react";
import { NavLink } from "react-router-dom";
import './AppHeader.css'

export default function AppHeader() {
  return (
    <header>
      <div className="center-column">
        <h1>🍽 Delicious Food</h1>
      </div>
      <nav>
        <ul className="center-column">
          <li>
            <NavLink to="/">Restaurants</NavLink>
          </li>
          <li>
            <NavLink to="/recommends">Recommends</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
