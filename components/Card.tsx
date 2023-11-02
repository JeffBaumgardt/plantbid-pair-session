import type { Character } from "@/types/lotr";
import { Button } from "@/components/ui/button";

export default function Card({
  character,
  openCharacterModal,
}: {
  character: Character;
  openCharacterModal: (arg0: Character) => void;
}) {
  return (
    <Button
      variant="secondary"
      className="mb-4 hover:bg-slate-100 bg-slate-300 text-lg"
      onClick={() => openCharacterModal(character)}
    >
      {character.name}
    </Button>
  );
}
