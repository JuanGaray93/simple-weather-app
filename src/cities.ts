export enum City {
  Glew = "3433762",
  Boulogne = "3435971",
  Caba = "3433955",
  SaoPaulo = "3448439",
  SanFernando = "3429095",
}

export const cityToName: Record<City, string> = {
  [City.Glew]: "Glew",
  [City.Boulogne]: "Boulogne Sur Mer",
  [City.Caba]: "Ciudad Autónoma de Buenos Aires",
  [City.SanFernando]: "San Fernando",
  [City.SaoPaulo]: "São Paulo",
};
