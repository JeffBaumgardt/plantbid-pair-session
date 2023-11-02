"use client";

import type { Character, CharacterQuote } from "@/types/lotr";
import { useState, useEffect } from "react";
import Card from "./Card";
import CharacterModal from "./CharacterModal";
import Pagination from "@/components/pagination";

import { fetchCharacterList, getQuotesByID } from "@/api/lotr";

export default function CardList() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [quotes, setQuotes] = useState<CharacterQuote[]>([]);

  useEffect(() => {
    async function getCharacters() {
      const { characters, total } = await fetchCharacterList({
        page,
        limit: 10,
      });
      setCharacters(characters);
      setTotal(total);
    }

    getCharacters();
  }, [page]);

  useEffect(() => {
    async function getQuotes() {
      if (selectedCharacter?._id) {
        const quotes = await getQuotesByID(selectedCharacter?._id);

        setQuotes(quotes);
      }
    }

    getQuotes();
  }, [selectedCharacter?._id]);

  return (
    <>
      {characters.map((character) => (
        <Card
          key={character._id}
          character={character}
          openCharacterModal={(newId) => setSelectedCharacter(newId)}
        />
      ))}
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          closeModal={() => setSelectedCharacter(null)}
          quotes={quotes}
        />
      )}
      <Pagination
        page={page}
        itemsPerPage={10}
        totalItems={total}
        paginate={(newPage) => setPage(newPage)}
      />
    </>
  );
}
