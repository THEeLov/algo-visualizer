import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGraph } from "../hooks/useGraphContext";
import { EditNodeSchema, EditNodeType } from "@/types";
import { useDialogs } from "@/hooks/useDialogsContext";

export const EditNodeDialog = () => {
  const { isEditDialogOpen, setIsEditDialogOpen } = useDialogs();
  const { editNode } = useGraph();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditNodeType>({
    resolver: zodResolver(EditNodeSchema),
  });

  const onSubmit = (data: EditNodeType) => {
    editNode(data);
    setIsEditDialogOpen(false);
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Node</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label htmlFor="value" className="">
          </Label>
          <Input
            id="value"
            className="col-span-3"
            type="number"
            {...register("value", { valueAsNumber: true })}
            placeholder="Enter value..."
            autoComplete="off"
          />
          {errors.value && (
            <p className="text-sm text-red-500">{errors.value.message}</p>
          )}
          <DialogFooter>
            <Button type="submit" onSubmit={() => handleSubmit(onSubmit)}>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditNodeDialog;