import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DestinationContext = createContext(null);

function DestinationContextProvider({ children }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const respDest = await axios(
        `https://www.forbestravelguide.com/api/destination.json`
      );
      // console.log("respDest", respDest.data);
      const destData = await respDest.data.filter(
        (it) => it.active === true && it.archived === false
      );
      // console.log("destData from Context", destData);
      setDestinations(destData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <DestinationContext.Provider value={{ destinations, loading }}>
      {children}
    </DestinationContext.Provider>
  );
}

export default DestinationContextProvider;
