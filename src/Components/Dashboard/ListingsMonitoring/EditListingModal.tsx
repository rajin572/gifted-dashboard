import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import ReuseableForm from "@/Components/ui/CustomUi/ReuseForm/ReuseableForm";
import {
  FormInput,
  FormSelect,
  FormCheckbox,
} from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { IListingMonitoringItem } from "@/types";
// import { useUpdateListingMutation } from "@/redux/features/listingsMonitoring/listingsMonitoringApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const editListingSchema = z.object({
  title: z.string().min(2, "Title is required"),
  status: z.enum(["AVAILABLE", "CLAIMED"]),
  category: z.string().min(1, "Category is required"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  spotlight: z.boolean(),
});

type EditListingFormValues = z.infer<typeof editListingSchema>;

interface EditListingModalProps {
  open: boolean;
  onClose: () => void;
  listing: IListingMonitoringItem | null;
  onSuccess?: () => void;
}

const EditListingModal = ({
  open,
  onClose,
  listing,
  onSuccess,
}: EditListingModalProps) => {
  // const [updateListing] = useUpdateListingMutation();

  const form = useForm<EditListingFormValues>({
    resolver: zodResolver(editListingSchema),
    defaultValues: {
      title: "",
      status: "AVAILABLE",
      category: "Furniture",
      neighborhood: "South Congress, Austin TX",
      spotlight: false,
    },
  });

  useEffect(() => {
    if (listing && open) {
      form.reset({
        title: listing.title,
        status: listing.status,
        category: listing.category,
        neighborhood: listing.neighborhood || `${listing.location}, Austin TX`,
        spotlight: listing.spotlight,
      });
    }
  }, [listing, open, form]);

  const handleSubmit = async (_values: EditListingFormValues) => {
    // TODO: wire to useUpdateListingMutation once the endpoint exists.
    // if (!listing) return;
    // const res = await tryCatchWrapper(
    //   updateListing,
    //   { params: { id: listing._id }, body: values },
    //   { toastLoadingMessage: "Saving changes..." }
    // );
    // if (res?.success) {
    //   onClose();
    //   onSuccess?.();
    // }
    onClose();
    onSuccess?.();
  };

  return (
    <ReuseableModal
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title="Edit Listing Details"
      description="Supervise metadata, neighborhood tagging, and home feed spotlight."
      maxWidth="sm:max-w-lg"
    >
      <ReuseableForm<EditListingFormValues>
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pt-2"
      >
        <FormInput
          control={form.control}
          name="title"
          label="Listing Title"
          placeholder="e.g. Vintage Herman Miller Office Chair"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="status"
            label="Listing Status"
            placeholder="Select status"
          >
            <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
            <SelectItem value="CLAIMED">CLAIMED</SelectItem>
          </FormSelect>

          <FormSelect
            control={form.control}
            name="category"
            label="Category"
            placeholder="Select category"
          >
            <SelectItem value="Furniture">Furniture</SelectItem>
            <SelectItem value="Baby & Kids">Baby & Kids</SelectItem>
            <SelectItem value="Kitchen & Dining">Kitchen & Dining</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Tools & Garden">Tools & Garden</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </FormSelect>
        </div>

        <FormInput
          control={form.control}
          name="neighborhood"
          label="Neighborhood / Community Node"
          placeholder="e.g. South Congress, Austin TX"
        />

        <div className="pt-2">
          <FormCheckbox
            control={form.control}
            name="spotlight"
            label="Spotlight on Home Feed"
            description="Pin this gift to the top of neighbor activity feed and broadcast queue"
          />
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            className="text-xs bg-[#ff4c05] hover:bg-[#e04304] text-white"
          >
            Save Changes
          </Button>
        </div>
      </ReuseableForm>
    </ReuseableModal>
  );
};

export default EditListingModal;
