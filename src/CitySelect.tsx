import React from "react";
import { CityId, cityIdToName, isCityId } from "./model/openWeather";

export type CityOption = CityId | "";


const eventValueToCityId = (newValue: string): CityId | undefined => {
  if (isCityId(newValue)) return newValue;
  return undefined;
};

const getCityIdAndName = (cityId: CityId | "") => [
  cityId,
  isCityId(cityId) ? cityIdToName[cityId] : "Ciudad actual",
];

interface Props {
  options: CityOption[];
  currCity: CityOption;
  onChangeCity: (city: CityOption) => void;
  loading: boolean;
  className?: string;
}

export const CitySelect: React.FC<Props> = ({
  options,
  currCity,
  onChangeCity,
  loading,
  className
}) => {
  return (
    <select
      value={currCity}
      onChange={(e) => onChangeCity(eventValueToCityId(e.target.value) ?? "")}
      name="cities"
      disabled={loading}
      className={className}
    >
      {options.map(getCityIdAndName).map(([value, cityName]) => {
        return (
          <option key={value} value={value}>
            {cityName}
          </option>
        );
      })}
    </select>
  );
};
