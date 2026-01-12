import { Menu } from "lucide-react";

export default function AdminTopbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="h-16 bg-white border-b flex items-center px-4 lg:px-8">
      <button
        onClick={onMenuClick}
        className="lg:hidden mr-4"
      >
        <Menu />
      </button>

      <h1 className="font-semibold text-lg">
        Aurindel Admin
      </h1>
    </header>
  );
}
