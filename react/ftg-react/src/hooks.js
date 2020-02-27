// hooks.js
import { useState, useEffect } from "react";
import _ from "lodash";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();

        const destByRegion = _.groupBy(json, 'regionPrimaryLevel');

        setData(destByRegion);
        setLoading(false);
      }
    
    fetchUrl();
  }, [url]);
  return [data, loading];
}
export { useFetch };
