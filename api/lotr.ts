import type { CharacterQuote } from "@/types/lotr";

const endpoint = "https://the-one-api.dev/v2/";

export const fetchCharacterList = async ({ page = 1, limit = 10 }) => {
  const resp = await fetch(
    `${endpoint}/character?limit=${limit}&page=${page}&sort=name:asc`,
    {
      headers: {
        authorization: `Bearer L9HCNgaxD3Oj3F1Je1Vk`,
      },
    }
  );

  if (!resp.ok) throw new Error("Something went horrably wrong");

  const data = await resp.json();

  return { characters: data.docs, total: data.total };
};

export const getQuotesByID = async (id: string) => {
  const resp = await fetch(`${endpoint}/character/${id}/quote`, {
    headers: {
      authorization: `Bearer L9HCNgaxD3Oj3F1Je1Vk`,
    },
  });
  if (!resp.ok) throw new Error("Unable to fetch quotes");

  const data = await resp.json();

  return data.docs.map((doc: CharacterQuote) => ({
    dialog: doc.dialog,
    id: doc.id,
  }));
};
