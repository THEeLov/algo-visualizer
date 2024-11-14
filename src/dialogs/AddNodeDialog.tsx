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
import { AddNodeSchema, AddNodeType } from "@/types";
import { useDialogs } from "@/hooks/useDialogsContext";

export const AddNodeDialog = () => {
  const { isAddDialogOpen, setIsAddDialogOpen } = useDialogs();
  const { addNode } = useGraph();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNodeType>({
    resolver: zodResolver(AddNodeSchema),
  });

  const onSubmit = (data: AddNodeType) => {
    addNode(data);
    setIsAddDialogOpen(false);
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Node</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label htmlFor="value" className="">
          </Label>
          <Input
            id="value"
            type="number"
            {...register("value")}
            placeholder="Enter value..."
            autoComplete="off"
          />
          {errors.value && (
            <p className="text-sm text-red-500">Value is required</p>
          )}
          <DialogFooter>
            <Button type="submit" onSubmit={() => handleSubmit(onSubmit)}>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNodeDialog;
