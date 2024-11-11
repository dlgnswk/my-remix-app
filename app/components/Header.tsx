import { Button } from "~/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b w-full">
      <div className="flex items-center justify-between h-14 px-4">
        <h1 className="text-xl font-semibold">Blogging</h1>

        <Button variant="outline">save</Button>
      </div>
    </header>
  );
};
