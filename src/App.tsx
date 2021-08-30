import React from "react";
import { CitySelect } from "./CitySelect";

export const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-lavenderWeb ">
      <h1 className="h-20 text-5xl bg-queenPink p-4">Weather</h1>
      <main className="p-4">
        <section>
          <CitySelect onChangeCity={(newCity) => alert(newCity)} />
        </section>
      </main>
    </div>
  );
};
