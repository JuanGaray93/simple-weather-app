import { CityForecast, CityId, Coordinates } from "./openWeather";

export enum AppError {
  NoPermissions,
  FetchingError,
}

export const errorToStr: Record<AppError, string> = {
  [AppError.FetchingError]:
    "Ocurrió un error al obtener el pronóstico. Inténtelo de nuevo.",
  [AppError.NoPermissions]: "La aplicación necesita acceder a su ubicación.",
};

export type LocationIdentifier = CityId | Coordinates;

export const locationIdentifierIsCoordinates = (
  li: LocationIdentifier
): li is Coordinates => typeof li === "object";

export type AppState = {
  error?: AppError;
  userLocation?: Coordinates;
  currCityId?: CityId;
  fetchedCity?: CityForecast;
};
