"use client";

import useNote from "@/hooks/useNote";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

type Props = {
  note: Note;
};

function SelectNoteButton({ note }: Props) {
  const noteID = useSearchParams().get("noteId") || "";

  const { noteText: selectedNoteText } = useNote();
  const [localNoteText, setLocalNoteText] = useState(note.text);
  const [shouldUseGlobalNoteText, setshouldUseGlobalNoteText] = useState(false);

  useEffect(() => {
    if (note.id === noteID) {
      setshouldUseGlobalNoteText(true);
    } else {
      setshouldUseGlobalNoteText(false);
    }
  }, [noteID, note.id]);

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [shouldUseGlobalNoteText, selectedNoteText]);

  const blankNoteText = "Empty Note";

  let noteText = localNoteText || blankNoteText;

  if (shouldUseGlobalNoteText) {
    noteText = selectedNoteText || blankNoteText;
  }
  return (
    <SidebarMenuButton
      asChild
      className={`item-start gap-0 pr-12 ${note.id === noteID && "bg-sidebar-accent/50"}`}
    >
      <Link
        href={`/?noteId=${note.id}`}
        className="flex h-fit flex-col items-start"
      >
        <p className="w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {noteText}
        </p>
        <p className="text-muted-foreground text-xs">
          {note.updatedAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  );
}

export default SelectNoteButton;
