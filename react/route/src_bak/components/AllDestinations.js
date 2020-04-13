import { useEffect, useState } from "react";

const AllDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  console.log("AAAAAAAAAAA");

  useEffect(() => {
    console.log("useEffect");
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      `https://www.forbestravelguide.com/api/destination.json`
    );
    const dataJson = await data.json();
    // console.log(dataJson);
    const destData = await dataJson.filter(
      it => it.active === true && it.archived === false
    );

    setDestinations(destData);
  };

  if (destinations.length > 0) {
    console.log("aaa", destinations);
    return destinations;
  }
};

export default AllDestinations;
