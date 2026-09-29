import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
// import { useResetPlatformPoliciesToDefaultsMutation } from "@/redux/features/platformPolicies/platformPoliciesApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

interface ResetPoliciesConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function ResetPoliciesConfirmModal({
    open,
    onClose,
    onSuccess,
}: ResetPoliciesConfirmModalProps) {
    // const [resetMutation] = useResetPlatformPoliciesToDefaultsMutation();

    const handleConfirm = async () => {
        // TODO: wire to useResetPlatformPoliciesToDefaultsMutation once the endpoint exists.
        // const res = await tryCatchWrapper(
        //   resetMutation,
        //   {},
        //   { toastLoadingMessage: "Resetting platform policies to defaults..." }
        // );
        // if (res?.success) {
        //   onClose();
        //   onSuccess?.();
        // }
        onClose();
        onSuccess?.();
    };

    return (
        <ConfirmModal<{ id: string }>
            open={open}
            onCancel={onClose}
            currentRecord={{ id: "reset_policies" }}
            onConfirm={handleConfirm}
            title="Reset Platform Policies to Factory Defaults"
            description="Are you sure you want to revert all gift taxonomies, community guidelines, and privacy policy clauses back to initial Austin Metro Node presets? Any custom clauses will be overwritten."
            confirmText="Reset to Defaults"
            cancelText="Cancel"
            variant="danger"
            iconPreset="delete"
        />
    );
}

