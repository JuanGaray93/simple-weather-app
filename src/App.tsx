import React, { useEffect, useState } from "react";
import { CitySelect } from "./CitySelect";
import { AppError, AppState, errorToStr } from "./model/app";
import { CityId } from "./model/openWeather";
import { getLocationForecast } from "./requests";

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>({});
  const isLoading = state.fetchedCity === undefined;

  const loadCity = async (newCity?: CityId) => {
    const location = newCity ?? state.userLocation;
    try {
      if (!location) return;
      const newCityData = await getLocationForecast(location);
      setState({
        ...state,
        fetchedCity: newCityData,
        currCityId: newCity,
        error: undefined,
      });
    } catch (error) {
      setState({
        ...state,
        fetchedCity: undefined,
        currCityId: undefined,
        error: AppError.FetchingError,
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          ...state,
          userLocation: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
        loadCity();
      },
      () => {
        setState({ ...state, error: AppError.NoPermissions });
      }
    );
  });

  return (
    <div className="h-screen flex flex-col bg-lavenderWeb ">
      <h1 className="h-20 text-5xl bg-queenPink p-4">Weather</h1>
      <main className="p-4">
        <section>
          <CitySelect onChangeCity={loadCity} loading={isLoading} />
          {isLoading && <span>Cargando...</span>}
          {state.error && (
            <span className="text-red">{errorToStr[state.error]}</span>
          )}
        </section>
      </main>
    </div>
  );
};
