import {
  CityId,
  Coordinates,
  locationIdentifierIsCoordinates,
  LocationIdentifier,
} from "./model";

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
  `${BASE_OPENWEATHER_URL}?id=${params.cityId}&cnt=${params.count}&appid=${params.appId}`;

type OpenWeatherCoordinatesUrlParams = Coordinates & {
  count: number; // from 1 to 16
  appId: string;
};
const buildOpenWeatherGeographicCoordinatesUrl = (
  params: OpenWeatherCoordinatesUrlParams
): string =>
  `${BASE_OPENWEATHER_URL}?lat=${params.lat}&lon=${params.lon}&cnt=${params.count}&appid=${params.appId}`;

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

export const getLocationForecast = async (params: LocationIdentifier) => {
  const requestUrl: string = buildRequestParamByLocation(params);
  return {};
};
