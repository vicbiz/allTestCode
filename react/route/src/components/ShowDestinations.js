import React from "react";
import { Link } from "react-router-dom";
import LoadingAnimation from "./Loading";
import FtgLogo from "../assets/img/ftg-logo.svg";
import MapIcon from "../assets/img/gps.svg";

function ShowDestinations({ destinations, loading }) {
  if (loading) {
    return (
      <div className="loadingBlock">
        <div className="loadingText">Loading Data ....</div>
        <LoadingAnimation />
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>World Destinations</h1>
        <div className="counter">{destinations.length} Properties</div>
        <div className="destListWrap">
          {destinations.map((data) => {
            const urlArray = data.uri.split("/");
            const destUrl = urlArray[urlArray.length - 1];

            return (
              <div className="card" key={data.id}>
                <div className="photo">
                  <Link to={`/destination/${destUrl}`} destination={data}>
                    <img src={data.heroImage.defaultUrl} alt={data.name} />
                  </Link>
                  {/* <Link
                    to={{
                      pathname: `/destination/${destUrl}`,
                      state: {
                        message: "Testing Prop Message"
                      }
                    }}
                  >
                    <img src={data.heroImage.defaultUrl} alt={data.name} />
                  </Link> */}
                </div>
                <div className="name">{data.name}</div>
                <div className="region">
                  {data.regionPrimaryLevel}, {data.regionSecondaryLevel}
                </div>
                <div className="externalLinks">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"http://forbestravelguide.com/" + data.uri}
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
                    href={
                      "https://www.google.com/maps/place/" + data.mapAddress
                    }
                  >
                    <img className="mapIcon" src={MapIcon} alt="google map" />
                  </a>
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: data.overview,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ShowDestinations;
