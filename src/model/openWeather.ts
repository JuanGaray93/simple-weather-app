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

// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
export const getWeatherTextById = (id: number): string => {
  if(200 <= id && id <= 299 ) return "Tormenta";
  if(300 <= id && id <= 399 ) return "Lluvia ligera";
  if(500 <= id && id <= 599 ) return "Lluvia";
  if(600 <= id && id <= 699 ) return "Nieve";
  if(801 <= id && id <= 809 ) return "Nublado";
  // Special cases
  if(id === 800 ) return "Despejado";
  if(id === 701) return "Niebla";
  if(id === 711) return "Humo";
  if(id === 721) return "Bruma";
  if(id === 731 || id === 761) return "Polvo";
  if(id === 741) return "Niebla espesa";
  if(id === 751) return "Arena";
  if(id === 771) return "Vendaval";
  if(id === 781) return "Tornado";
  return "";
};

interface Weather {
  id: number;
  icon: string;
}

export interface DayWeatherForecast {
  weather: Weather[];
  temp: {
    day: number;
    min: number;
    max: number;
  };
  dt: number;
}

interface DayCurrentWeather {
  weather: Weather[];
  temp: number;
}

export interface CityForecast {
  lat: number;
  lon: number;
  current: DayCurrentWeather;
  daily: DayWeatherForecast[];
}
