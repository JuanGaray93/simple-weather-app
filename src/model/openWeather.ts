export interface Coordinates {
  lat: number;
  lon: number;
}

export enum CityId {
  Glew = "3433762",
  Boulogne = "3435971",
  Caba = "3433955",
  SaoPaulo = "3448439",
  SanFernando = "3429095",
}

export const isCityId = (val: unknown): val is CityId =>
  Object.values(CityId).includes(val as CityId);

export const cityIdToName: Record<CityId, string> = {
  [CityId.Glew]: "Glew",
  [CityId.Boulogne]: "Boulogne Sur Mer",
  [CityId.Caba]: "Ciudad Autónoma de Buenos Aires",
  [CityId.SanFernando]: "San Fernando",
  [CityId.SaoPaulo]: "São Paulo",
};

export const cityIdToCoordinates: Record<CityId, Coordinates> = {
  [CityId.Glew]: { lon: -58.37764, lat: -34.89151 },
  [CityId.Boulogne]: { lon: -58.565811, lat: -34.50732 },
  [CityId.Caba]: { lon: -58.450001, lat: -34.599998 },
  [CityId.SanFernando]: { lon: -58.56279, lat: -34.44104 },
  [CityId.SaoPaulo]: { lon: -46.636108, lat: -23.547501 },
};

interface Weather {
  id: number;
  icon: string;
}

interface DayWeatherForecast {
  weather: Weather;
  temp: {
    day: number;
    min: number;
    max: number;
  };
}
interface DayCurrentWeather {
  weather: Weather;
  temp: number;
}

export interface CityForecast {
  lat: number;
  lon: number;
  current: DayCurrentWeather;
  daily: DayWeatherForecast[];
}
