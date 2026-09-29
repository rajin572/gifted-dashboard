import { useState } from "react";
import { Plus, Diamond, Pencil, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ICommunityGuidelineItem } from "@/types";

interface CommunityGuidelinesSectionProps {
    guidelines: ICommunityGuidelineItem[];
    onAddNew: () => void;
    onEditModal?: (item: ICommunityGuidelineItem) => void;
    onSaveGuideline?: (item: ICommunityGuidelineItem) => void;
    onDeleteGuideline?: (id: string) => void;
}

export default function CommunityGuidelinesSection({
    guidelines,
    onAddNew,
    onEditModal,
    onSaveGuideline,
    onDeleteGuideline,
}: CommunityGuidelinesSectionProps) {
    // Allow toggling inline edit for rule cards (Rule #1 defaults to editing in the screenshot)
    const [editingId, setEditingId] = useState<string | null>("guideline_1");
    const [editedTitles, setEditedTitles] = useState<Record<string, string>>({});
    const [editedContents, setEditedContents] = useState<Record<string, string>>({});

    const handleStartEdit = (item: ICommunityGuidelineItem) => {
        setEditingId(item._id);
        setEditedTitles((prev) => ({ ...prev, [item._id]: item.title }));
        setEditedContents((prev) => ({ ...prev, [item._id]: item.content }));
    };

    const handleSaveInline = (item: ICommunityGuidelineItem) => {
        const updated: ICommunityGuidelineItem = {
            ...item,
            title: editedTitles[item._id] ?? item.title,
            content: editedContents[item._id] ?? item.content,
            updatedAtText: "Updated just now",
        };
        onSaveGuideline?.(updated);
        setEditingId(null);
    };

    return (
        <div id="section-guidelines" className="bg-white rounded-2xl border border-border p-5.5 shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
                <div className="flex items-center gap-2">
                    <Diamond className="w-4 h-4 text-[#ff4c05] fill-[#ff4c05]/20 shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                        Community Guidelines & Generosity Charter ({guidelines.length})
                    </h2>
                </div>
                <Button
                    type="button"
                    onClick={onAddNew}
                    className="bg-[#f59e0b] hover:bg-[#d97706] text-white text-xs font-semibold h-9 px-4 gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Guideline</span>
                </Button>
            </div>

            <p className="text-xs text-gray-500 -mt-2">
                Define the core principles, anti-resale rules, porch pickup conduct, and storytelling integrity standards displayed to all app members.
            </p>

            {/* Guidelines List */}
            <div className="space-y-4 pt-1">
                {guidelines.map((rule) => {
                    const isInlineEditing = editingId === rule._id;
                    const currentTitle = editedTitles[rule._id] ?? rule.title;
                    const currentContent = editedContents[rule._id] ?? rule.content;

                    return (
                        <div
                            key={rule._id}
                            className={`bg-white rounded-xl border p-4.5 space-y-3 transition-all ${isInlineEditing
                                    ? "border-gray-300 shadow-xs ring-1 ring-gray-200"
                                    : "border-gray-200/90 shadow-2xs hover:border-gray-300"
                                }`}
                        >
                            {/* Rule Card Header */}
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-2 flex-wrap text-xs">
                                    <span className="inline-block px-2 py-0.5 rounded-full border border-amber-300 text-amber-700 bg-amber-50 text-[10px] font-bold uppercase tracking-wider">
                                        {rule.ruleNumber}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-[11px]">
                                        {rule.category}
                                    </span>
                                    <span className="text-gray-400 text-xs">• {rule.updatedAtText}</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    {isInlineEditing ? (
                                        <>
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => handleSaveInline(rule)}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] h-7 px-3 font-semibold cursor-pointer shadow-2xs"
                                            >
                                                Save
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={() => setEditingId(null)}
                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                                title="Cancel edit"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    if (onEditModal) {
                                                        onEditModal(rule);
                                                    } else {
                                                        handleStartEdit(rule);
                                                    }
                                                }}
                                                className="text-[11px] h-7 px-2.5 font-medium text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900 gap-1 cursor-pointer"
                                            >
                                                <Pencil className="w-3 h-3 text-gray-500" />
                                                <span>Edit</span>
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={() => onDeleteGuideline?.(rule._id)}
                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                title="Delete rule"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Title & Content */}
                            {isInlineEditing ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={currentTitle}
                                        onChange={(e) =>
                                            setEditedTitles((prev) => ({
                                                ...prev,
                                                [rule._id]: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-900 focus:outline-hidden focus:border-[#ff4c05]"
                                    />
                                    <textarea
                                        rows={3}
                                        value={currentContent}
                                        onChange={(e) =>
                                            setEditedContents((prev) => ({
                                                ...prev,
                                                [rule._id]: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs leading-relaxed text-gray-700 focus:outline-hidden focus:border-[#ff4c05]"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                                        {rule.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {rule.content}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

