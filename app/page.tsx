"use client";

import { useState } from "react";
import { characters } from "../data/characters";
import { universes } from "../data/universes";

export default function Home() {
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);

  const selectCharacter = (characterId: string) => {
    window.location.href =
      `https://t.me/neverrmorebot?start=${characterId}`;
  };

  const filteredCharacters = characters.filter(
    (character) =>
      character.universe.toLowerCase() === selectedUniverse
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050608] via-[#0c1017] to-[#07090d] text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="text-center mb-16">

          <h1 className="text-6xl md:text-7xl font-black tracking-tight">
            RPVerse
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Enter a universe. Become part of the story.
          </p>

        </div>

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
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(79,93,255,0.25)]"
              >

                <img
                  src={universe.image}
                  alt={universe.name}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6">

                  <h2 className="text-3xl font-bold">
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
              className="mb-10 text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Universes
            </button>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {filteredCharacters.map((character) => (

                <button
                  key={character.id}
                  onClick={() => selectCharacter(character.id)}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(79,93,255,0.25)] text-left"
                >

                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">

                    <h2 className="text-3xl font-bold">
                      {character.name}
                    </h2>

                    <p className="text-gray-300 mt-2">
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