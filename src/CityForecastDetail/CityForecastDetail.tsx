import React from "react";
import { buildLocalDateByUnixTimestamp } from "../helpers/dateHelpers";
import { CityForecast } from "../model/openWeather";
import { DailyCityForecast } from "./DailyCityForecast";

interface Props {
  forecast: CityForecast;
}

export const CityForecastDetail: React.FC<Props> = ({ forecast }) => {
  return (
    <ol className="flex flex-wrap flex-row gap-10">
      <li>
        <DailyCityForecast
          day="Hoy"
          iconId={forecast.current.weather.icon}
          temp={forecast.current.temp}
        />
      </li>
      {forecast.daily.map((df, index) => {
        return (
          <li key={index}>
            <DailyCityForecast
              day={buildLocalDateByUnixTimestamp(df.dt)}
              iconId={df.weather.icon}
              temp={df.temp.day}
            />
          </li>
        );
      })}
    </ol>
  );
};
