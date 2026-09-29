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
import { ICommunityGuidelineItem } from "@/types";
// import { useSaveCommunityGuidelineMutation } from "@/redux/features/platformPolicies/platformPoliciesApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const guidelineSchema = z.object({
    ruleNumber: z.string().min(1, "Rule number is required"),
    category: z.string().min(1, "Please select a category"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
});

type GuidelineFormValues = z.infer<typeof guidelineSchema>;

interface AddEditGuidelineModalProps {
    open: boolean;
    onClose: () => void;
    guideline: ICommunityGuidelineItem | null;
    onSuccess?: (savedItem: ICommunityGuidelineItem) => void;
}

export default function AddEditGuidelineModal({
    open,
    onClose,
    guideline,
    onSuccess,
}: AddEditGuidelineModalProps) {
    // const [saveMutation] = useSaveCommunityGuidelineMutation();

    const form = useForm<GuidelineFormValues>({
        resolver: zodResolver(guidelineSchema),
        defaultValues: {
            ruleNumber: "RULE #6",
            category: "Core Principle",
            title: "",
            content: "",
        },
    });

    useEffect(() => {
        if (open) {
            if (guideline) {
                form.reset({
                    ruleNumber: guideline.ruleNumber,
                    category: guideline.category,
                    title: guideline.title,
                    content: guideline.content,
                });
            } else {
                form.reset({
                    ruleNumber: "RULE #6",
                    category: "Core Principle",
                    title: "",
                    content: "",
                });
            }
        }
    }, [open, guideline, form]);

    const handleSubmit = async (values: GuidelineFormValues) => {
        // TODO: wire to useSaveCommunityGuidelineMutation once the endpoint exists.
        // const payload = {
        //   _id: guideline?._id,
        //   ...values,
        //   updatedAtText: "Updated just now",
        // };
        // const res = await tryCatchWrapper(
        //   saveMutation,
        //   { body: payload },
        //   { toastLoadingMessage: "Saving community guideline..." }
        // );
        // if (res?.success) {
        //   onClose();
        //   onSuccess?.(res.data);
        // }
        const savedItem: ICommunityGuidelineItem = {
            _id: guideline?._id || `guideline_${Date.now()}`,
            ruleNumber: values.ruleNumber,
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
            title={guideline ? "Edit Community Guideline" : "Add New Community Guideline"}
            description="Define core principles, anti-resale rules, porch pickup conduct, and storytelling integrity standards."
            maxWidth="sm:max-w-lg"
        >
            <ReuseableForm<GuidelineFormValues>
                form={form}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 pt-2"
            >
                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        control={form.control}
                        name="ruleNumber"
                        label="Rule Label"
                        placeholder="e.g. RULE #6"
                    />
                    <FormSelect
                        control={form.control}
                        name="category"
                        label="Rule Category"
                        placeholder="Select category"
                    >
                        <SelectItem value="Core Principle">Core Principle</SelectItem>
                        <SelectItem value="Porch Etiquette">Porch Etiquette</SelectItem>
                        <SelectItem value="Listing Safety">Listing Safety</SelectItem>
                        <SelectItem value="Community Conduct">Community Conduct</SelectItem>
                        <SelectItem value="Authentic Storytelling">Authentic Storytelling</SelectItem>
                        <SelectItem value="Fair Chance Giving">Fair Chance Giving</SelectItem>
                    </FormSelect>
                </div>

                <FormInput
                    control={form.control}
                    name="title"
                    label="Guideline Title"
                    placeholder="e.g. Contactless Porch Pickup & Safety"
                />

                <FormTextarea
                    control={form.control}
                    name="content"
                    label="Guideline Charter Text"
                    placeholder="Enter full rule text displayed across mobile and web..."
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
                        className="bg-[#ff4c05] hover:bg-[#e04304] text-white text-xs h-9 font-semibold cursor-pointer shadow-xs"
                    >
                        {guideline ? "Save Changes" : "Create Guideline"}
                    </Button>
                </div>
            </ReuseableForm>
        </ReuseableModal>
    );
}

