import React, { useState } from "react";
import { City, cityToName } from "./cities";

interface Props {
  onChangeCity: (city?: City) => void;
}

// Not entirely proud of the type conversions in this component
// I could've used a Select library but I preferred to keep it as close to HTML as possible
export const CitySelect: React.FC<Props> = ({ onChangeCity }) => {
  const [value, setValue] = useState<City | undefined>(undefined);
  const handleSelectCity = (newCity?: City) => {
    onChangeCity(newCity);
    setValue(newCity);
  };
  const eventValueToCity = (newValue: string): City | undefined => {
    if (newValue == "") return undefined;
    return newValue as City;
  };
  return (
    <select
      value={value}
      onChange={(e) => handleSelectCity(eventValueToCity(e.target.value))}
      name="cities"
    >
      <option value="">Ciudad actual</option>
      {Object.keys(City).map((cityKey) => {
        // see https://github.com/Microsoft/TypeScript/issues/28565 for the logic behind the enum key casting
        const c = City[cityKey as keyof typeof City];
        return (
          <option key={cityKey} value={c}>
            {cityToName[c]}
          </option>
        );
      })}
    </select>
  );
};
