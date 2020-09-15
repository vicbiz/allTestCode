import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoadingAnimation from "./Loading";
import FtgLogo from "../assets/img/ftg-logo.svg";
import MapIcon from "../assets/img/gps.svg";

export default function Destinations({ destinations }) {
  // useEffect(() => {
  //   getData();
  // }, []);

  // const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getData = async () => {
  //   const data = await fetch(
  //     `https://www.forbestravelguide.com/api/destination.json`
  //   );
  //   const dataJson = await data.json();
  //   // console.log(dataJson);
  //   const destData = await dataJson.filter(
  //     it => it.active === true && it.archived === false
  //   );

  //   setDestinations(destData);
  //   setLoading(false);
  // };
  // https://www.google.com/maps/@33.946692,-83.9003013,15z
  // https://www.google.com/maps/place/Moscow,+Russia/@55.5784911,36.2673619,8z/data=!3m1!4b1!4m5!3m4!1s0x46b54afc73d4b0c9:0x3d44d6cc5757cf4c!8m2!3d55.755826!4d37.6172999

  console.log("here....");
  if (destinations && destinations.length > 0) {
    console.log("length", destinations.length);
    setLoading(false);
  }

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
          {destinations.map(data => {
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
                    __html: data.overview
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
