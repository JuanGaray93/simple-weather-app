import React from "react";

interface Props {
  day: string;
  temp: number;
  iconId: string;
  weatherDescription: string;
}

export const DailyCityForecast: React.FC<Props> = ({ day, temp, iconId, weatherDescription }) => {
  return (
    <article className="bg-transparentBlack p-4 w-40 h-48 flex flex-col justify-center text-white">
      <h3>{day}</h3>
      <p>{temp}°C</p>
      <p>{weatherDescription}</p>
      <img src={`http://openweathermap.org/img/wn/${iconId}@2x.png`} title={weatherDescription} alt={weatherDescription} />
    </article>
  );
};
