import React, { useState, useEffect } from "react";
import axios from "axios";

function FetchDataOne() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dest, setDest] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.forbestravelguide.com/api/destination.json`)
      .then(response => {
        setLoading(false);
        setError("");
        setDest(response.data);
      })
      .catch(error => {
        setLoading(false);
        setError("Something went wrong! " + error);
        setDest([]);
      });
  }, []);

  return (
    <div>
      <ul>
        {dest.map(d => (
          <li key={d.id}>
            {d.name}, ({d.active ? "active" : "inactive"}), {d.mapAddress}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchDataOne;
