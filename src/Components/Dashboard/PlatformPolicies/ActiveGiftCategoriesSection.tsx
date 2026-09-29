import { useState } from "react";
import { X, Plus, Diamond } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { IGiftCategoryItem } from "@/types";

interface ActiveGiftCategoriesSectionProps {
    categories: IGiftCategoryItem[];
    onAddCategory?: (name: string) => void;
    onRemoveCategory?: (id: string) => void;
}

export default function ActiveGiftCategoriesSection({
    categories,
    onAddCategory,
    onRemoveCategory,
}: ActiveGiftCategoriesSectionProps) {
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleAdd = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = newCategoryName.trim();
        if (!trimmed) return;
        onAddCategory?.(trimmed);
        setNewCategoryName("");
    };

    return (
        <div id="section-categories" className="bg-white rounded-2xl border border-border p-5.5 shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
                <div className="flex items-center gap-2">
                    <Diamond className="w-4 h-4 text-[#ff4c05] fill-[#ff4c05]/20 shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                        Active Gift Categories ({categories.length})
                    </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    LIVE TAXONOMY ACTIVE
                </span>
            </div>

            <p className="text-xs text-gray-500 -mt-2">
                Standardized taxonomies available when neighbors post gifts in the Austin metro network.
            </p>

            {/* Input Box Row */}
            <form onSubmit={handleAdd} className="flex items-center gap-2 pt-1">
                <input
                    type="text"
                    placeholder="Type a new category name (e.g. Pet Supplies, Gardening, Musical Gear)..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-hidden focus:border-[#ff4c05] shadow-2xs transition-colors"
                />
                <Button
                    type="submit"
                    className="bg-[#ff4c05] hover:bg-[#e04304] text-white text-xs font-semibold h-9 px-4 gap-1.5 cursor-pointer shrink-0 shadow-xs"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                </Button>
            </form>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        className="group inline-flex items-center gap-2 bg-white border border-gray-200/90 hover:border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 shadow-2xs transition-all"
                    >
                        <span>{cat.name}</span>
                        <button
                            type="button"
                            onClick={() => onRemoveCategory?.(cat._id)}
                            className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors cursor-pointer"
                            title={`Remove ${cat.name}`}
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

