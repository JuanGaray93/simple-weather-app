import React from "react";

interface Props {
  day: string;
  temp: number;
  iconId: string;
}

export const DailyCityForecast: React.FC<Props> = ({ day, temp, iconId }) => {
  return (
    <article>
      <h3>{day}</h3>
      <p>{temp}°C</p>
      <p>{iconId}</p>
    </article>
  );
};
