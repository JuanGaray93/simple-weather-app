export enum CityId {
  Glew = "3433762",
  Boulogne = "3435971",
  Caba = "3433955",
  SaoPaulo = "3448439",
  SanFernando = "3429095",
}

export const cityIdToName: Record<CityId, string> = {
  [CityId.Glew]: "Glew",
  [CityId.Boulogne]: "Boulogne Sur Mer",
  [CityId.Caba]: "Ciudad Autónoma de Buenos Aires",
  [CityId.SanFernando]: "San Fernando",
  [CityId.SaoPaulo]: "São Paulo",
};

export interface Coordinates {
  lat: number;
  lon: number;
}

export type LocationIdentifier = CityId | Coordinates;

export const locationIdentifierIsCoordinates = (
  li: LocationIdentifier
): li is Coordinates => typeof li === "object";

export interface CityData {}

export enum AppError {
  NoPermissions,
  FetchingError,
}

export const errorToStr: Record<AppError, string> = {
  [AppError.FetchingError]:
    "Ocurrió un error al obtener el pronóstico. Inténtelo de nuevo.",
  [AppError.NoPermissions]: "La aplicación necesita acceder a su ubicación.",
};

export type AppState = {
  userLocation?: Coordinates;
  currCityId?: CityId;
  fetchedCity?: CityData;
  error?: AppError;
};
