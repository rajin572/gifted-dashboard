import { useEffect } from "react";
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
import { IPendingReportItem } from "@/types";
import { Check } from "lucide-react";
// import { useResolveReportMutation } from "@/redux/features/safetyReports/safetyReportsApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const resolveSchema = z.object({
  action: z.string().min(1, "Please select an enforcement action"),
  note: z.string().min(5, "Resolution note must be at least 5 characters"),
  restoreItem: z.boolean(),
  notifyParties: z.boolean(),
});

type ResolveFormValues = z.infer<typeof resolveSchema>;

interface ResolvePolicyModalProps {
  open: boolean;
  onClose: () => void;
  report: IPendingReportItem | null;
  onSuccess?: () => void;
}

export default function ResolvePolicyModal({
  open,
  onClose,
  report,
  onSuccess,
}: ResolvePolicyModalProps) {
  // const [resolveMutation] = useResolveReportMutation();

  const form = useForm<ResolveFormValues>({
    resolver: zodResolver(resolveSchema),
    defaultValues: {
      action: "suspension-14d",
      note: "",
      restoreItem: true,
      notifyParties: true,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        action: "suspension-14d",
        note: "",
        restoreItem: true,
        notifyParties: true,
      });
    }
  }, [open, form]);

  const handleSubmit = async (_values: ResolveFormValues) => {
    // TODO: wire to useResolveReportMutation once the endpoint exists.
    // if (!report) return;
    // const res = await tryCatchWrapper(
    //   resolveMutation,
    //   {
    //     reportId: report._id,
    //     action: values.action,
    //     note: values.note,
    //     restoreItem: values.restoreItem,
    //     notifyParties: values.notifyParties,
    //   },
    //   { toastLoadingMessage: "Enforcing community safety policy..." }
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
      title="Resolve Dispute & Enforce Community Charter"
      description={`Enforce governance rules on ${report?.targetTitle ?? "target incident"}.`}
      maxWidth="sm:max-w-lg"
    >
      <ReuseableForm<ResolveFormValues>
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pt-2"
      >
        <FormSelect
          control={form.control}
          name="action"
          label="Enforcement Action"
          placeholder="Select policy remedy"
        >
          <SelectItem value="suspension-14d">
            14-Day Claim Suspension (First Zero-Resale Breach)
          </SelectItem>
          <SelectItem value="warning">
            Formal Reprimand & Warning on Member Record
          </SelectItem>
          <SelectItem value="restore-pool">
            Cancel Claim & Restore Item to Community Pool
          </SelectItem>
          <SelectItem value="permanent-exclusion">
            Permanent Community Ban (Commercial Reselling Breach)
          </SelectItem>
        </FormSelect>

        <FormTextarea
          control={form.control}
          name="note"
          label="Audit Justification & Member Notification Reason"
          placeholder="Explain the finding grounding this resolution under Gifted Charter guidelines..."
          rows={3}
        />

        <div className="space-y-2 pt-1">
          <FormCheckbox
            control={form.control}
            name="restoreItem"
            label="Restore gifted item to neighborhood pool immediately"
          />
          <FormCheckbox
            control={form.control}
            name="notifyParties"
            label="Send verified policy resolution receipt to reporter & subject"
          />
        </div>

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
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-9 gap-1.5 font-semibold cursor-pointer shadow-xs"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Enforcement & Close Case</span>
          </Button>
        </div>
      </ReuseableForm>
    </ReuseableModal>
  );
}
