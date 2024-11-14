import { useContext } from "react";
import { DialogsContext } from "../contexts/DialogsContext";

export const useDialogs = () => {
  const context = useContext(DialogsContext);

  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }

  return context;
};