import React from "react";
import { CityId, cityIdToName, isCityId } from "./model/openWeather";

export type CityOption = CityId | "";

interface Props {
  options: CityOption[];
  currCity: CityOption;
  onChangeCity: (city: CityOption) => void;
  loading: boolean;
}

const eventValueToCity = (newValue: string): CityId | undefined => {
  if (isCityId(newValue)) return newValue;
  return undefined;
};

const getCityValueAndName = (cityId: CityId | "") => [
  cityId,
  isCityId(cityId) ? cityIdToName[cityId] : "Ciudad actual",
];

export const CitySelect: React.FC<Props> = ({
  options,
  currCity,
  onChangeCity,
  loading,
}) => {
  return (
    <select
      value={currCity}
      onChange={(e) => onChangeCity(eventValueToCity(e.target.value))}
      name="cities"
      disabled={loading}
    >
      {options.map(getCityValueAndName).map(([value, cityName]) => {
        return (
          <option key={value} value={value}>
            {cityName}
          </option>
        );
      })}
    </select>
  );
};
