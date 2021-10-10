import React from "react";
import { buildLocalDateByUnixTimestamp } from "../helpers/dateHelpers";
import { CityForecast, getWeatherTextById } from "../model/openWeather";
import { DailyCityForecast } from "./DailyCityForecast";

interface Props {
  forecast: CityForecast;
}

export const CityForecastDetail: React.FC<Props> = ({ forecast }) => {
  return (
    <ol className="flex flex-wrap flex-row gap-10">
      <li>
        <DailyCityForecast
          weatherDescription={getWeatherTextById(forecast.current.weather[0].id)}
          day="Hoy"
          iconId={forecast.current.weather[0].icon}
          temp={forecast.current.temp}
        />
      </li>
      {forecast.daily.map((df, index) => {
        return (
          <li key={index}>
            <DailyCityForecast
              weatherDescription={getWeatherTextById(df.weather[0].id)}
              day={buildLocalDateByUnixTimestamp(df.dt)}
              iconId={df.weather[0].icon}
              temp={df.temp.day}
            />
          </li>
        );
      })}
    </ol>
  );
};
