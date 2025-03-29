"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { debounceTomeout } from "@/lib/constants";
import { createNoteAction } from "@/actions/notes";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const savingToast = toast("Saving Current Note", {
        id: 1,
        description: "Saving your current note before creating a new one.",
      });

      await new Promise((resolve) => {
        setTimeout(resolve, debounceTomeout + 500);
      });
      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);
      toast.dismiss(1);
      toast.success("New Note Created", {
        description: "A new note has been created.",
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
          border: "1px solid #388E3C",
        },
      });

      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;
