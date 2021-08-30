import React, { useEffect, useState } from "react";
import { CitySelect } from "./CitySelect";
import { AppState, City } from "./model";
import { getCityData } from "./requests";

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>({});
  const isLoading = state.dataFetchState === undefined;
  const hasError = state.dataFetchState === "error";

  const loadCity = async (newCity?: City) => {
    try {
      const newCityData = await getCityData(newCity);
      setState({ ...state, dataFetchState: newCityData, currCity: newCity });
    } catch (error) {
      setState({ ...state, dataFetchState: "error" });
    }
  };

  useEffect(() => {
    loadCity();
  });

  return (
    <div className="h-screen flex flex-col bg-lavenderWeb ">
      <h1 className="h-20 text-5xl bg-queenPink p-4">Weather</h1>
      <main className="p-4">
        <section>
          <CitySelect onChangeCity={loadCity} loading={isLoading} />
          {isLoading && <span>Cargando...</span>}
          {hasError && (
            <span className="text-red">
              Ocurrió un error. Inténtelo de nuevo.
            </span>
          )}
        </section>
      </main>
    </div>
  );
};
