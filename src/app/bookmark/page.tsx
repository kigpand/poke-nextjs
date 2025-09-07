import { Header } from "@/components/bookmark";
import { BookmarkLists } from "@/components/bookmark/BookmarkLists";
import { Separator } from "@/components/ui/separator";

export default function Bookmark() {
  return (
    <main className="w-full h-full">
      <section
        className="mx-auto max-w-5xl px-4 py-6 md:py-8"
        aria-labelledby="bookmark-heading"
      >
        <Header />
        <Separator className="mb-6" />
        <BookmarkLists />
      </section>
    </main>
  );
}
