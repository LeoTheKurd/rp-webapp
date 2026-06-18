"use client";

import { useState } from "react";
import { characters } from "../data/characters";
import { universes } from "../data/universes";

export default function Home() {
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);

  const selectCharacter = (characterId: string) => {

    alert("Button clicked: " + characterId);

    const telegram = (window as any).Telegram;

    if (!telegram) {
      alert("Telegram object not found");
      return;
    }

    if (!telegram.WebApp) {
      alert("Telegram WebApp not found");
      return;
    }

    telegram.WebApp.sendData(
      JSON.stringify({
        character: characterId,
      })
    );

    alert("Data sent");

    telegram.WebApp.close();
  };

  const filteredCharacters = characters.filter(
    (character) =>
      character.universe.toLowerCase() === selectedUniverse
  );

  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="text-5xl font-bold mb-4">
          Enter a Universe
        </h1>

        <p className="text-gray-400 mb-12 text-lg">
          Choose a character and begin your story.
        </p>

        {!selectedUniverse ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {universes.map((universe) => (
              <button
                key={universe.id}
                onClick={() =>
                  setSelectedUniverse(
                    universe.name.toLowerCase()
                  )
                }
                className="bg-[#171a21] border border-[#242938] rounded-2xl overflow-hidden hover:border-[#4f5dff] hover:shadow-2xl transition-all duration-300 text-left"
              >
                <img
                  src={universe.image}
                  alt={universe.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold">
                    {universe.name}
                  </h2>
                </div>
              </button>
            ))}

          </div>
        ) : (
          <>
            <button
              onClick={() =>
                setSelectedUniverse(null)
              }
              className="mb-8 text-gray-400 hover:text-white"
            >
              ← Back
            </button>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {filteredCharacters.map((character) => (
                <button
                  key={character.id}
                  onClick={() => selectCharacter(character.id)}
                  className="group bg-[#171a21] rounded-2xl overflow-hidden border border-[#242938] hover:border-[#4f5dff] hover:shadow-2xl transition-all duration-300 block text-left"
                >
                  <div className="overflow-hidden">

                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                  </div>

                  <div className="p-5">

                    <h2 className="text-2xl font-bold">
                      {character.name}
                    </h2>

                    <p className="text-gray-400 italic mt-2">
                      {character.description}
                    </p>

                  </div>

                </button>
              ))}

            </div>
          </>
        )}

      </div>
    </main>
  );
}