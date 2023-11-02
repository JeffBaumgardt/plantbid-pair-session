import type { Character, CharacterQuote } from "@/types/lotr";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CharacterModal({
  character,
  closeModal,
  quotes,
}: {
  character: Character;
  closeModal: () => void;
  quotes: { id: string; dialog: string }[];
}) {
  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>{character.name}</DialogHeader>
        <DialogDescription>
          <ul>
            <li>Race: {character.race}</li>
            <li>Gender: {character.gender}</li>
            <li>
              Quotes:
              <ul className="ml-4">
                {quotes.slice(0, 2).map((quote) => (
                  <li key={quote.id}>{quote.dialog} </li>
                ))}
              </ul>
            </li>
          </ul>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
