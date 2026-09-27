import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import ReuseableForm from "@/Components/ui/CustomUi/ReuseForm/ReuseableForm";
import {
  FormSelect,
  FormTextarea,
  FormCheckbox,
} from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { IUserMonitoringItem } from "@/types";
// import { useIssueWarningMutation } from "@/redux/features/userMonitoring/userMonitoringApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { useEffect } from "react";

const warningSchema = z.object({
  category: z.string().min(1, "Please select a violation category"),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  notifyUser: z.boolean(),
});

type WarningFormValues = z.infer<typeof warningSchema>;

interface IssueWarningModalProps {
  open: boolean;
  onClose: () => void;
  user: IUserMonitoringItem | null;
  onSuccess?: () => void;
}

const IssueWarningModal = ({
  open,
  onClose,
  user,
  onSuccess,
}: IssueWarningModalProps) => {
  // const [issueWarning] = useIssueWarningMutation();

  const form = useForm<WarningFormValues>({
    resolver: zodResolver(warningSchema),
    defaultValues: {
      category: "Zero-Resale Rule Breach",
      reason: "",
      notifyUser: true,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        category: "Zero-Resale Rule Breach",
        reason: "",
        notifyUser: true,
      });
    }
  }, [open, form]);

  const handleSubmit = async (_values: WarningFormValues) => {
    // TODO: wire to useIssueWarningMutation once the endpoint exists.
    // if (!user) return;
    // const res = await tryCatchWrapper(
    //   issueWarning,
    //   { params: { id: user._id }, body: values },
    //   { toastLoadingMessage: "Issuing formal warning..." }
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
      title={`Issue Community Warning: ${user?.name ?? ""}`}
      description="Record an official supervisory warning on this member's reputation record."
      maxWidth="sm:max-w-lg"
    >
      <ReuseableForm<WarningFormValues>
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pt-2"
      >
        <FormSelect
          control={form.control}
          name="category"
          label="Violation Category"
          placeholder="Select violation type"
        >
          <SelectItem value="Zero-Resale Rule Breach">
            Zero-Resale Rule Breach
          </SelectItem>
          <SelectItem value="Repeated No-Show For Pickup">
            Repeated No-Show For Pickup
          </SelectItem>
          <SelectItem value="Inappropriate Communication">
            Inappropriate Communication
          </SelectItem>
          <SelectItem value="Misrepresented Item Condition">
            Misrepresented Item Condition
          </SelectItem>
          <SelectItem value="Other Supervision Reason">
            Other Supervision Reason
          </SelectItem>
        </FormSelect>

        <FormTextarea
          control={form.control}
          name="reason"
          label="Warning Details & Directive"
          placeholder="Describe the violation notice and requirements to maintain standing..."
          rows={4}
        />

        <FormCheckbox
          control={form.control}
          name="notifyUser"
          label="Send formal email warning notification to member"
        />

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
            Issue Warning
          </Button>
        </div>
      </ReuseableForm>
    </ReuseableModal>
  );
};

export default IssueWarningModal;
