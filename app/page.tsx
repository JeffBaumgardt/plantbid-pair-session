import { Suspense } from "react";
import CardList from "@/components/CardList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <Suspense fallback={<span>Loading...</span>}>
        <CardList />
      </Suspense>
    </main>
  );
}
