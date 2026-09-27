import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../select";
import { cn } from "@/lib/utils";

export interface FilterOption {
    value: string;
    label: string;
}

interface ReuseFilterSelectProps {
    options: FilterOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    disabled?: boolean;
    allowClear?: boolean;
    onClear?: () => void;
}

const ReuseFilterSelect: React.FC<ReuseFilterSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select filter",
    label,
    className = "",
    triggerClassName = "",
    contentClassName = "",
    disabled = false,
    allowClear = false,
    onClear,
}) => {
    const handleValueChange = (newValue: string) => {
        if (newValue === "__clear__" && allowClear && onClear) {
            onClear();
            return;
        }
        onChange(newValue);
    };

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && (
                <label className="text-xs font-medium text-[#6B6D75]">{label}</label>
            )}
            <Select
                value={value}
                onValueChange={handleValueChange}
                disabled={disabled}
            >
                <SelectTrigger
                    className={cn(
                        "h-10 px-3.5 text-xs bg-[#F4F4F6] text-[#1A1A1E] border-0 rounded-xl outline-none shadow-none ring-0 min-w-[140px] focus-visible:ring-0 focus-visible:border-0 hover:bg-[#EBEBEF] cursor-pointer",
                        triggerClassName
                    )}
                >
                    <SelectValue className="placeholder:text-base-color/50!" placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className={cn("rounded-xl border-[#E4E4E7] shadow-lg", contentClassName)}>
                    {allowClear && value && (
                        <>
                            <SelectItem value="__clear__" className="text-xs italic text-muted-foreground">
                                Clear selection
                            </SelectItem>
                            <div className="border-t my-1" />
                        </>
                    )}
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default ReuseFilterSelect;