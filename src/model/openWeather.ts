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

interface DayForecast {
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    id: number;
    icon: string;
  };
}

export interface CityForecast {
  list: DayForecast[];
}
