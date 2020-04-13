import React, { useContext } from "react";
import ShowDestinations from "./ShowDestinations";
import { DestinationContext } from "../contexts/DestinationContext";

export default function Destinations() {
  const { destinations, loading } = useContext(DestinationContext);
  return <ShowDestinations destinations={destinations} loading={loading} />;
}
