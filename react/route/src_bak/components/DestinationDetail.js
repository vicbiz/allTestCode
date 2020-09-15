import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";

import LoadingAnimation from "./Loading";
import FtgLogo from "../assets/img/ftg-logo.svg";
import MapIcon from "../assets/img/gps.svg";

export default function DestinationDetail({ match }) {
  useEffect(() => {
    fetchDest(match);
  }, [match]);

  const [dest, setDest] = useState([]);

  const fetchDest = async match => {
    const fetchUrl = `https://www.forbestravelguide.com/api/property/destination/${match.params.id}.json`;
    const fetchData = await fetch(fetchUrl);
    const dest = await fetchData.json();
    const destActive = await dest.filter(it => it.active === true);
    // console.log("destActive", destActive);
    setDest(destActive);
  };

  let rating = function(d) {
    let rating = "";
    if (d.ratingObject.ratingValue !== "") {
      rating = `<img
        class="rating"
        alt="FTG Rating"
        src="https://secure.s.forbestravelguide.com/images/icon-circle-${d.ratingObject.ratingValue}-star.svg"s
      />`;
    }
    return rating;
  };

  if (dest.length === 0) {
    return (
      <div className="loadingBlock">
        <div className="loadingText">Loading Data ....</div>
        <LoadingAnimation />
      </div>
    );
  } else {
    // console.log("aaaaaaaaaa", this.props.location.state);
    return (
      <div>
        <h1>{dest.length > 0 ? dest[0].destinationName : ""}</h1>
        <div className="counter">{dest.length} Properties</div>
        {/* message : {message} */}
        <div className="container destinationDetailWrap">
          {dest.map(d => {
            return (
              <div className="destinationBlock" key={d.propertyId}>
                <div className="propImg">
                  {Parser(rating(d))}
                  <img
                    className="propertyImg"
                    src={d.media.defaultUrl}
                    alt={d.media.description}
                  />
                </div>
                <div>{d.propertyName}</div>
                <div>{d.propertyHeadline}</div>
                <div className="externalLinks">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"http://forbestravelguide.com/" + d.propertyURI}
                  >
                    <img
                      className="ftgIcon"
                      src={FtgLogo}
                      alt="Forbes Travel Guide"
                    />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    // href={`https://www.google.com/maps/place/${d.propertyName.replace(/\s+/gi,"+")}+${d.city.replace(/\s+/gi,"+"}+${d.state.replace(/\s+/gi,"+"}+${d.country.replace(/\s+/gi,"+"}`}
                    href={`https://www.google.com/maps/search/${d.propertyName}+${d.city}`}
                  >
                    <img className="mapIcon" src={MapIcon} alt="google map" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
