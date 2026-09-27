import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import ReuseableForm from "@/Components/ui/CustomUi/ReuseForm/ReuseableForm";
import { FormSelect, FormInput } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { ISubscriberAccountItem } from "@/types";
// import { useAdjustSubscriberTierMutation } from "@/redux/features/subscription/subscriptionApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const manageSchema = z.object({
  tier: z.string().min(1, "Please select a tier"),
  compMonths: z.string().optional(),
  reason: z.string().min(3, "Reason must be at least 3 characters"),
});

type ManageFormValues = z.infer<typeof manageSchema>;

interface ManageSubscriberModalProps {
  open: boolean;
  onClose: () => void;
  subscriber: ISubscriberAccountItem | null;
  onSuccess?: () => void;
}

export default function ManageSubscriberModal({
  open,
  onClose,
  subscriber,
  onSuccess,
}: ManageSubscriberModalProps) {
  // const [adjustMutation] = useAdjustSubscriberTierMutation();

  const form = useForm<ManageFormValues>({
    resolver: zodResolver(manageSchema),
    defaultValues: {
      tier: "PLUS",
      compMonths: "0",
      reason: "",
    },
  });

  useEffect(() => {
    if (subscriber && open) {
      form.reset({
        tier: subscriber.tier,
        compMonths: "0",
        reason: "",
      });
    }
  }, [subscriber, open, form]);

  const handleSubmit = async (_values: ManageFormValues) => {
    // TODO: wire to useAdjustSubscriberTierMutation once the endpoint exists.
    // if (!subscriber) return;
    // const res = await tryCatchWrapper(
    //   adjustMutation,
    //   {
    //     subscriberId: subscriber._id,
    //     tier: values.tier,
    //     compMonths: Number(values.compMonths) || 0,
    //     reason: values.reason,
    //   },
    //   { toastLoadingMessage: "Updating subscriber tier & quota..." }
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
      title={`Manage Subscription: ${subscriber?.name ?? ""}`}
      description="Upgrade, downgrade, or issue complimentary billing cycles for this member account."
      maxWidth="sm:max-w-md"
    >
      <ReuseableForm<ManageFormValues>
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pt-2"
      >
        <FormSelect
          control={form.control}
          name="tier"
          label="Subscription Tier"
          placeholder="Select membership tier"
        >
          <SelectItem value="FREE">Gifted Free ($0/mo • 3 claims)</SelectItem>
          <SelectItem value="PLUS">Gifted Plus ($9.99/mo • 10 claims)</SelectItem>
          <SelectItem value="PREMIUM">Gifted Premium ($19.99/mo • 25 claims)</SelectItem>
        </FormSelect>

        <FormSelect
          control={form.control}
          name="compMonths"
          label="Add Complimentary Months (Comp)"
          placeholder="Select duration"
        >
          <SelectItem value="0">None (Maintain standard cycle)</SelectItem>
          <SelectItem value="1">+1 Month Free Access</SelectItem>
          <SelectItem value="2">+2 Months Free Access</SelectItem>
          <SelectItem value="3">+3 Months Free Access</SelectItem>
          <SelectItem value="6">+6 Months Ambassador Comp</SelectItem>
        </FormSelect>

        <FormInput
          control={form.control}
          name="reason"
          label="Administrative Reason / Audit Note"
          placeholder="e.g. Verified neighborhood volunteer compensation"
        />

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-xs h-9"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#ff4c05] hover:bg-[#e04304] text-white text-xs h-9 font-semibold cursor-pointer"
          >
            Apply Changes
          </Button>
        </div>
      </ReuseableForm>
    </ReuseableModal>
  );
}
