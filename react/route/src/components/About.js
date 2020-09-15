import React, { useContext } from "react";
import { DestinationContext } from "../contexts/DestinationContext";
import ShowDestinations from "./ShowDestinations";

export default function About({ test }) {
  const { destinations, loading } = useContext(DestinationContext);
  // console.log("destinations", destinations);
  // console.log("loading", loading);
  return (
    <div>
      <h1>About Us</h1>
      {test}
      <div className="contactForm">
        <div className="formRow">
          <input type="text" name="name" autoComplete="off" required />
          <label htmlFor="name" className="label-name">
            <span className="content-name">First Name</span>
          </label>
        </div>
        <div className="formRow">
          <input type="text" name="name" autoComplete="off" required />
          <label htmlFor="name" className="label-name">
            <span className="content-name">Last Name</span>
          </label>
        </div>
      </div>
      <br />
      <br />
      <br />

      <ShowDestinations destinations={destinations} loading={loading} />
    </div>
  );
}
