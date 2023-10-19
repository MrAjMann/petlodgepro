import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type Props = {};
function DropDownMenu({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="transition-colors duration-100 ease-in-out"
      >
        <Button
          variant="default"
          className="flex h-16 w-16 p-2 data-[state=open]:bg-slate-900 border-2 hover:border-green-500 hover:bg-slate-900 data-[state=open]:rotate-90"
        >
          <MoreHorizontal className="h-8 w-8  " />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DropDownMenu;
