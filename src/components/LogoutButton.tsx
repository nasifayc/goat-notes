"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast, useSonner } from "sonner";
import { error } from "console";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";

// logout button
function LogoutButton() {
  //   const {} = useSonner();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out successfully", {
        description: "You have been logged out successfully",
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
          border: "1px solid #388E3C",
        },
      });

      router.push("/login");
    } else {
      toast.error("Error", {
        description: errorMessage,
        style: {
          backgroundColor: "#F44336",
          color: "white",
          border: "1px solid #D32F2F",
        },
      });
    }

    setLoading(false);
  };
  return (
    <Button
      className="w-24 cursor-pointer"
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogoutButton;
