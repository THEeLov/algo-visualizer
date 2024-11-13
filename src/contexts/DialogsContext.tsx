import { createContext, useState } from "react";


interface DialogsContextProps {
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  setIsAddDialogOpen: (value: boolean) => void;
  setIsEditDialogOpen: (value: boolean) => void;
}

export const DialogsContext = createContext<DialogsContextProps | undefined>(undefined);

export const DialogsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  return (
    <DialogsContext.Provider value={{
      isAddDialogOpen,
      isEditDialogOpen,
      setIsAddDialogOpen,
      setIsEditDialogOpen
    }}>
      {children}
    </DialogsContext.Provider>
  )
}