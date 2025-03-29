"use client";

import useNote from "@/hooks/useNote";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  note: Note;
};

function SelectNoteButton({ note }: Props) {
  const noteID = useSearchParams().get("noteID") || "";

  const { noteText: selectedNoteText } = useNote();
  const [localNoteText, setLocalNoteText] = useState(note.text);

  const blankNoteText = "Empty Note";

  //   to be completed by tomorrow

  let noteText = localNoteText || blankNoteText;
  return <div>SelectNoteButton</div>;
}

export default SelectNoteButton;
