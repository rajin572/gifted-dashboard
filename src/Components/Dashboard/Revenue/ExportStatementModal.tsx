import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import ReuseableForm from "@/Components/ui/CustomUi/ReuseForm/ReuseableForm";
import { FormSelect, FormCheckbox } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Download } from "lucide-react";
// import { useExportRevenueStatementMutation } from "@/redux/features/revenue/revenueApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const exportSchema = z.object({
  format: z.string().min(1, "Please select an export format"),
  timeframe: z.string().min(1, "Please select a timeframe"),
  includeCustomerData: z.boolean(),
});

type ExportFormValues = z.infer<typeof exportSchema>;

interface ExportStatementModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ExportStatementModal({ open, onClose }: ExportStatementModalProps) {
  // const [exportMutation] = useExportRevenueStatementMutation();

  const form = useForm<ExportFormValues>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      format: "pdf",
      timeframe: "30d",
      includeCustomerData: true,
    },
  });

  const handleExport = async (_values: ExportFormValues) => {
    // TODO: wire to useExportRevenueStatementMutation once the endpoint exists.
    // const res = await tryCatchWrapper(
    //   exportMutation,
    //   { body: values },
    //   { toastLoadingMessage: "Preparing revenue statement..." }
    // );
    // if (res?.success) {
    //   onClose();
    // }
    onClose();
  };

  return (
    <ReuseableModal
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title="Export Revenue & Settlement Statement"
      description="Download certified financial telemetry statements, settlement ledger, or community transit fund reports."
      maxWidth="sm:max-w-md"
    >
      <ReuseableForm<ExportFormValues>
        form={form}
        onSubmit={handleExport}
        className="flex flex-col gap-4 pt-2"
      >
        <FormSelect
          control={form.control}
          name="format"
          label="Statement Format"
          placeholder="Choose file format"
        >
          <SelectItem value="pdf">PDF Summary Statement (Certified)</SelectItem>
          <SelectItem value="csv">CSV Full Transaction Ledger</SelectItem>
          <SelectItem value="xlsx">Excel Multi-Tier Breakdown</SelectItem>
        </FormSelect>

        <FormSelect
          control={form.control}
          name="timeframe"
          label="Reporting Cadence"
          placeholder="Select period"
        >
          <SelectItem value="30d">Last 30 Days (Aug 25 - Sep 28)</SelectItem>
          <SelectItem value="90d">Quarter 3 (Q3 2026)</SelectItem>
          <SelectItem value="12m">Trailing 12 Months (ARR Basis)</SelectItem>
        </FormSelect>

        <div className="pt-1">
          <FormCheckbox
            control={form.control}
            name="includeCustomerData"
            label="Include masked recipient telemetry & settlement hashes"
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
            className="bg-[#ff4c05] hover:bg-[#e04304] text-white text-xs h-9 gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Generate & Download
          </Button>
        </div>
      </ReuseableForm>
    </ReuseableModal>
  );
}
