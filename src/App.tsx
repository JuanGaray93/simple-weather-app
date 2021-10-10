import React, { useEffect, useState } from "react";
import { CityOption, CitySelect } from "./CitySelect";
import { CityForecastDetail } from "./CityForecastDetail/CityForecastDetail";
import { AppError, AppState, errorToStr } from "./model/app";
import { CityId } from "./model/openWeather";
import { getLocationForecast } from "./requests";

const cityOptions: CityOption[] = ["", ...Object.values(CityId)];

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>({});
  const [selectedCity, setSelectedCity] = useState<CityOption>("");
  const isLoading = state.fetchedCity === undefined;

  const loadCity = async (newCity?: CityId) => {
    setState((state) => ({
      ...state,
      fetchedCity: undefined,
    }));
    const location = newCity ?? state.userLocation;
    try {
      if (!location) return;
      const newCityData = await getLocationForecast(location);
      setState((state) => ({
        ...state,
        fetchedCity: newCityData,
        currCityId: newCity,
        error: undefined,
      }));
    } catch (error) {
      setState((state) => ({
        ...state,
        fetchedCity: undefined,
        currCityId: undefined,
        error: AppError.FetchingError,
      }));
    }
  };

  useEffect(() => {
    if (state.userLocation === undefined)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((state) => ({
            ...state,
            userLocation: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          }));
        },
        () => {
          setState((state) => ({ ...state, error: AppError.NoPermissions }));
        }
      );
    loadCity(selectedCity || undefined);
  }, [state.userLocation?.lat, state.userLocation?.lon, selectedCity]);

  return (
    <div className="min-h-screen flex flex-col bg-lavenderWeb ">
      <h1 className="h-20 text-5xl bg-queenPink p-4">Weather</h1>
      <main className="p-4">
        <section>
          <CitySelect
            options={cityOptions}
            currCity={selectedCity}
            onChangeCity={(newCity) => setSelectedCity(newCity)}
            loading={isLoading}
            className="my-4"
          />
          {state.error !== undefined ? (
            <p className="text-red">{errorToStr[state.error]}</p>
          ) : null}
        </section>
        <section>
          {isLoading && state.error === undefined && <p>Cargando...</p>}
          {state.fetchedCity && (
            <CityForecastDetail forecast={state.fetchedCity} />
          )}
        </section>
      </main>
    </div>
  );
};
