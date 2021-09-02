import React from "react";
import { CityForecast } from "./model/openWeather";

interface Props {
  forecast: CityForecast;
}

export const ForecastDetail: React.FC<Props> = ({ forecast }) => {
  return <div>{JSON.stringify(forecast)}</div>;
};
