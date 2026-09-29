import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import ReuseableForm from "@/Components/ui/CustomUi/ReuseForm/ReuseableForm";
import {
    FormInput,
    FormSelect,
    FormTextarea,
} from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { IPrivacyClauseItem } from "@/types";
// import { useSavePrivacyClauseMutation } from "@/redux/features/platformPolicies/platformPoliciesApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const privacySchema = z.object({
    clauseNumber: z.string().min(1, "Clause number is required"),
    category: z.string().min(1, "Please select a category"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
});

type PrivacyFormValues = z.infer<typeof privacySchema>;

interface AddEditPrivacyClauseModalProps {
    open: boolean;
    onClose: () => void;
    clause: IPrivacyClauseItem | null;
    onSuccess?: (savedItem: IPrivacyClauseItem) => void;
}

export default function AddEditPrivacyClauseModal({
    open,
    onClose,
    clause,
    onSuccess,
}: AddEditPrivacyClauseModalProps) {
    // const [saveMutation] = useSavePrivacyClauseMutation();

    const form = useForm<PrivacyFormValues>({
        resolver: zodResolver(privacySchema),
        defaultValues: {
            clauseNumber: "CLAUSE #6",
            category: "Address Protection",
            title: "",
            content: "",
        },
    });

    useEffect(() => {
        if (open) {
            if (clause) {
                form.reset({
                    clauseNumber: clause.clauseNumber,
                    category: clause.category,
                    title: clause.title,
                    content: clause.content,
                });
            } else {
                form.reset({
                    clauseNumber: "CLAUSE #6",
                    category: "Address Protection",
                    title: "",
                    content: "",
                });
            }
        }
    }, [open, clause, form]);

    const handleSubmit = async (values: PrivacyFormValues) => {
        // TODO: wire to useSavePrivacyClauseMutation once the endpoint exists.
        // const payload = {
        //   _id: clause?._id,
        //   ...values,
        //   updatedAtText: "Updated just now",
        // };
        // const res = await tryCatchWrapper(
        //   saveMutation,
        //   { body: payload },
        //   { toastLoadingMessage: "Saving privacy clause..." }
        // );
        // if (res?.success) {
        //   onClose();
        //   onSuccess?.(res.data);
        // }
        const savedItem: IPrivacyClauseItem = {
            _id: clause?._id || `clause_${Date.now()}`,
            clauseNumber: values.clauseNumber,
            category: values.category,
            title: values.title,
            content: values.content,
            updatedAtText: "Updated just now",
        };
        onSuccess?.(savedItem);
        onClose();
    };

    return (
        <ReuseableModal
            open={open}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            title={clause ? "Edit Privacy Clause" : "Add New Privacy Clause"}
            description="Govern household street address shielding, geographic fuzzing, and zero-data-selling terms."
            maxWidth="sm:max-w-lg"
        >
            <ReuseableForm<PrivacyFormValues>
                form={form}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 pt-2"
            >
                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        control={form.control}
                        name="clauseNumber"
                        label="Clause Label"
                        placeholder="e.g. CLAUSE #6"
                    />
                    <FormSelect
                        control={form.control}
                        name="category"
                        label="Privacy Scope"
                        placeholder="Select scope"
                    >
                        <SelectItem value="Address Protection">Address Protection</SelectItem>
                        <SelectItem value="Location Privacy">Location Privacy</SelectItem>
                        <SelectItem value="Communications">Communications</SelectItem>
                        <SelectItem value="Data Rights">Data Rights</SelectItem>
                        <SelectItem value="Retention">Retention</SelectItem>
                        <SelectItem value="Third-Party Safeguards">Third-Party Safeguards</SelectItem>
                    </FormSelect>
                </div>

                <FormInput
                    control={form.control}
                    name="title"
                    label="Clause Title"
                    placeholder="e.g. Strict Exact Address Shielding"
                />

                <FormTextarea
                    control={form.control}
                    name="content"
                    label="Privacy Terms Text"
                    placeholder="Enter full privacy legal terms enforced on the platform..."
                    rows={4}
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
                        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs h-9 font-semibold cursor-pointer shadow-xs"
                    >
                        {clause ? "Save Changes" : "Create Clause"}
                    </Button>
                </div>
            </ReuseableForm>
        </ReuseableModal>
    );
}

