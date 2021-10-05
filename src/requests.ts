import {
  locationIdentifierIsCoordinates,
  LocationIdentifier,
} from "./model/app";
import {
  CityForecast,
  cityIdToCoordinates,
  Coordinates,
} from "./model/openWeather";

const castStringEnvVarToStr = (envVar?: string | boolean) => {
  if (typeof envVar === "boolean") return "";
  return envVar ?? "";
};

const API_KEY: string = castStringEnvVarToStr(import.meta.env.VITE_WEATHER_API_KEY);
const FORECAST_DAYS = 5;
const BASE_OPENWEATHER_URL =
  "https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&units=metric";

/* Read about the open weather API here:
 *  https://openweathermap.org/api/one-call-api#how
 */

type OpenWeatherCoordinatesUrlParams = Coordinates & {
  count: number; // from 1 to 16
  appId: string;
};
const buildOpenWeatherGeographicCoordinatesUrl = (
  params: OpenWeatherCoordinatesUrlParams
): string =>
  `${BASE_OPENWEATHER_URL}&lat=${params.lat}&lon=${params.lon}&cnt=${params.count}&appid=${params.appId}`;

const buildRequestParamByLocation = (location: LocationIdentifier): string => {
  const coords = locationIdentifierIsCoordinates(location)
    ? location
    : cityIdToCoordinates[location];
  return buildOpenWeatherGeographicCoordinatesUrl({
    appId: API_KEY,
    count: FORECAST_DAYS,
    ...coords,
  });
};

/** @todo */
export const getLocationForecast = async (
  params: LocationIdentifier
): Promise<CityForecast> => {
  const requestUrl: string = buildRequestParamByLocation(params);
  const res = await fetch(requestUrl);
  if (res.ok) return res.json();
  throw new Error();
};
