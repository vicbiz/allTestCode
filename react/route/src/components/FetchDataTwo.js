import React, { useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  loading: true,
  error: "",
  dest: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: "",
        dest: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: "Something went wrong! " + action.payload,
        dest: [],
      };
    default:
      return state;
  }
};

function FetchDataTwo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`https://www.forbestravelguide.com/api/destination.json`)
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error });
      });
  }, []);

  if (state.loading) {
    return <div>Loading....</div>;
  } else {
    return (
      <div>
        <ul>
          {state.dest.map((d) => (
            <li key={d.id}>
              {d.name}, ({d.active ? "active" : "inactive"}), {d.mapAddress}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FetchDataTwo;
