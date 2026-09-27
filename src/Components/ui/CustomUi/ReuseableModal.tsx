import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "../button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../dialog";

interface ReusableModalProps {
    trigger?: React.ReactNode;
    title: string;
    accessibleTitle?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    maxWidth?: string;
    showCloseButton?: boolean;
    closeButtonText?: string;
    showXCloseButton?: boolean;
    contentClassName?: string;
    dialogClassName?: string;
}

function ReusableModal({
    trigger,
    title,
    accessibleTitle,
    description,
    children,
    footer,
    open,
    onOpenChange,
    maxWidth = "sm:max-w-[765px]",
    showCloseButton = false,
    closeButtonText = "Cancel",
    showXCloseButton = true,
    contentClassName,
    dialogClassName,
}: ReusableModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className={cn(maxWidth, dialogClassName)} showCloseButton={showXCloseButton}>
                {title ? (
                    <DialogHeader>
                        <DialogTitle className='text-lg sm:text-xl lg:text-2xl font-bold'>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                ) : (
                    <DialogHeader className="sr-only">
                        <DialogTitle>{accessibleTitle ?? "Dialog"}</DialogTitle>
                    </DialogHeader>
                )}

                <div className={cn("py-3 sm:py-4 px-3 sm:px-5 max-h-[calc(85vh-130px)] overflow-y-auto", contentClassName)}>{children}</div>

                {(footer || showCloseButton) && (
                    <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2 p-3 sm:p-4">
                        {showCloseButton && (
                            <DialogClose asChild>
                                <Button variant="outline">{closeButtonText}</Button>
                            </DialogClose>
                        )}
                        {footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ReusableModal;
