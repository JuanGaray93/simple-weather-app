import React, { useState } from "react";
import { CityId, cityIdToName } from "./model";

interface Props {
  onChangeCity: (city?: CityId) => void;
  loading: boolean;
}

// Not entirely proud of the type conversions in this component
// I could've used a Select library but I preferred to keep it as close to HTML as possible
export const CitySelect: React.FC<Props> = ({ onChangeCity, loading }) => {
  const [value, setValue] = useState<CityId | undefined>(undefined);
  const handleSelectCity = (newCity?: CityId) => {
    onChangeCity(newCity);
    setValue(newCity);
  };
  const eventValueToCity = (newValue: string): CityId | undefined => {
    if (newValue == "") return undefined;
    return newValue as CityId;
  };
  return (
    <select
      value={value}
      onChange={(e) => handleSelectCity(eventValueToCity(e.target.value))}
      name="cities"
      disabled={loading}
    >
      <option value="">Ciudad actual</option>
      {Object.keys(CityId).map((cityKey) => {
        // see https://github.com/Microsoft/TypeScript/issues/28565 for the logic behind the enum key casting
        const c = CityId[cityKey as keyof typeof CityId];
        return (
          <option key={cityKey} value={c}>
            {cityIdToName[c]}
          </option>
        );
      })}
    </select>
  );
};
