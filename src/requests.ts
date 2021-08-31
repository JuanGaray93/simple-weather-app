import {
  Coordinates,
  locationIdentifierIsCoordinates,
  LocationIdentifier,
} from "./model/app";
import { CityForecast, CityId } from "./model/openWeather";

const castEnvVarToStr = (apiKey?: string | boolean) => {
  if (typeof apiKey === "boolean") return "";
  return apiKey ?? "";
};

const API_KEY: string = castEnvVarToStr(import.meta.env.VITE_WEATHER_API_KEY);
const FORECAST_DAYS = 5;
const BASE_OPENWEATHER_URL = "api.openweathermap.org/data/2.5/forecast/daily";

/* Read about the open weather API here:
 *  https://openweathermap.org/forecast16
 */

interface OpenWeatherCityIdUrlParams {
  cityId: CityId;
  count: number; // from 1 to 16
  appId: string;
}
const buildOpenWeatherCityIdUrl = (
  params: OpenWeatherCityIdUrlParams
): string =>
  `${BASE_OPENWEATHER_URL}?id=${params.cityId}&cnt=${params.count}&appid=${params.appId}&units=metric`;

type OpenWeatherCoordinatesUrlParams = Coordinates & {
  count: number; // from 1 to 16
  appId: string;
};
const buildOpenWeatherGeographicCoordinatesUrl = (
  params: OpenWeatherCoordinatesUrlParams
): string =>
  `${BASE_OPENWEATHER_URL}?lat=${params.lat}&lon=${params.lon}&cnt=${params.count}&appid=${params.appId}&units=metric`;

const buildRequestParamByLocation = (location: LocationIdentifier): string => {
  if (locationIdentifierIsCoordinates(location))
    return buildOpenWeatherGeographicCoordinatesUrl({
      appId: API_KEY,
      count: FORECAST_DAYS,
      ...location,
    });
  return buildOpenWeatherCityIdUrl({
    appId: API_KEY,
    count: FORECAST_DAYS,
    cityId: location,
  });
};

/** @todo */
export const getLocationForecast = async (
  params: LocationIdentifier
): Promise<CityForecast> => {
  const requestUrl: string = buildRequestParamByLocation(params);
  return {
    list: [
      {
        temp: {
          day: 123,
          max: 125,
          min: 1,
        },
        weather: {
          icon: "asd",
          id: 800,
        },
      },
    ],
  };
};
