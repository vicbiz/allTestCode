import React, { useState, useEffect, useContext } from "react";
import Parser from "html-react-parser";

import LoadingAnimation from "./Loading";
import FtgLogo from "../assets/img/ftg-logo.svg";
import MapIcon from "../assets/img/gps.svg";
import { DestinationContext } from "../contexts/DestinationContext";

export default function DestinationDetail({ match }) {
  useEffect(() => {
    fetchDest(match);
  }, [match]);

  const [dest, setDest] = useState([]);
  const [proploading, setProploading] = useState(true);
  const { destinations, loading } = useContext(DestinationContext);

  const currentDestination = destinations.filter(
    (it) => it.uri === "/destinations/" + match.params.id
  )[0];

  const fetchDest = async (match) => {
    const fetchUrl = `https://www.forbestravelguide.com/api/property/destination/${match.params.id}.json`;
    const fetchData = await fetch(fetchUrl);
    const dest = await fetchData.json();
    const destActive = await dest.filter((it) => it.active === true);
    // console.log("destActive", destActive);
    setDest(destActive);
    setProploading(false);
  };

  let rating = function (d) {
    let rating = "";
    if (d.ratingObject.ratingValue !== "") {
      rating = `<div class="ratingWrap"><img
        class="rating"
        alt="FTG Rating"
        src="https://secure.s.forbestravelguide.com/images/icon-circle-${d.ratingObject.ratingValue}-star.svg"s
      /></div>`;
    }
    return rating;
  };

  if (proploading || loading) {
    return (
      <div className="loadingBlock">
        <div className="loadingText">Loading Data ....</div>
        <LoadingAnimation />
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>{currentDestination.name}</h1>
        <div className="region">
          {currentDestination.regionPrimaryLevel},{" "}
          {currentDestination.regionSecondaryLevel}
        </div>

        <div className="container" id="destinationTop">
          <div className="destinationPhoto">
            <img
              src={currentDestination.heroImage.extraLargeUrl}
              alt={currentDestination.name}
            />
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: currentDestination.overview,
            }}
          ></div>
        </div>

        <div className="counter">
          {dest.length > 0 ? dest.length : "No"} FTG Properties found.
        </div>
        <div className="container destinationDetailWrap">
          {dest.map((d) => {
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
                <div className="propNameBlock">
                  <div className="propName">{d.propertyName}</div>
                  <div className="propHeadline">{d.propertyHeadline}</div>
                </div>
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
