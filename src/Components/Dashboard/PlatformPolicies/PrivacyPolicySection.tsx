import { useState } from "react";
import { Plus, ShieldCheck, Pencil, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { IPrivacyClauseItem } from "@/types";

interface PrivacyPolicySectionProps {
    clauses: IPrivacyClauseItem[];
    onAddNew: () => void;
    onEditModal?: (item: IPrivacyClauseItem) => void;
    onSaveClause?: (item: IPrivacyClauseItem) => void;
    onDeleteClause?: (id: string) => void;
}

export default function PrivacyPolicySection({
    clauses,
    onAddNew,
    onEditModal,
    onSaveClause,
    onDeleteClause,
}: PrivacyPolicySectionProps) {
    // Clause #1 starts in inline edit mode as shown in the design picture
    const [editingId, setEditingId] = useState<string | null>("clause_1");
    const [editedTitles, setEditedTitles] = useState<Record<string, string>>({});
    const [editedContents, setEditedContents] = useState<Record<string, string>>({});

    const handleStartEdit = (item: IPrivacyClauseItem) => {
        setEditingId(item._id);
        setEditedTitles((prev) => ({ ...prev, [item._id]: item.title }));
        setEditedContents((prev) => ({ ...prev, [item._id]: item.content }));
    };

    const handleSaveInline = (item: IPrivacyClauseItem) => {
        const updated: IPrivacyClauseItem = {
            ...item,
            title: editedTitles[item._id] ?? item.title,
            content: editedContents[item._id] ?? item.content,
            updatedAtText: "Updated just now",
        };
        onSaveClause?.(updated);
        setEditingId(null);
    };

    return (
        <div id="section-privacy" className="bg-white rounded-2xl border border-border p-5.5 shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                        Privacy Policy ({clauses.length})
                    </h2>
                </div>
                <Button
                    type="button"
                    onClick={onAddNew}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold h-9 px-4 gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Privacy Clause</span>
                </Button>
            </div>

            <p className="text-xs text-gray-500 -mt-2">
                Govern household street address shielding, geographic fuzzing, and zero-data-selling policies enforced across mobile & web.
            </p>

            {/* Clauses List */}
            <div className="space-y-4 pt-1">
                {clauses.map((clause) => {
                    const isInlineEditing = editingId === clause._id;
                    const currentTitle = editedTitles[clause._id] ?? clause.title;
                    const currentContent = editedContents[clause._id] ?? clause.content;

                    return (
                        <div
                            key={clause._id}
                            className={`bg-white rounded-xl border p-4.5 space-y-3 transition-all ${isInlineEditing
                                    ? "border-gray-300 shadow-xs ring-1 ring-gray-200"
                                    : "border-gray-200/90 shadow-2xs hover:border-gray-300"
                                }`}
                        >
                            {/* Clause Header */}
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-2 flex-wrap text-xs">
                                    <span className="inline-block px-2 py-0.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 text-[10px] font-bold uppercase tracking-wider">
                                        {clause.clauseNumber}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-[11px]">
                                        {clause.category}
                                    </span>
                                    <span className="text-gray-400 text-xs">• {clause.updatedAtText}</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    {isInlineEditing ? (
                                        <>
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => handleSaveInline(clause)}
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
                                                        onEditModal(clause);
                                                    } else {
                                                        handleStartEdit(clause);
                                                    }
                                                }}
                                                className="text-[11px] h-7 px-2.5 font-medium text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900 gap-1 cursor-pointer"
                                            >
                                                <Pencil className="w-3 h-3 text-gray-500" />
                                                <span>Edit</span>
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={() => onDeleteClause?.(clause._id)}
                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                title="Delete clause"
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
                                                [clause._id]: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-900 focus:outline-hidden focus:border-[#2563eb]"
                                    />
                                    <textarea
                                        rows={3}
                                        value={currentContent}
                                        onChange={(e) =>
                                            setEditedContents((prev) => ({
                                                ...prev,
                                                [clause._id]: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs leading-relaxed text-gray-700 focus:outline-hidden focus:border-[#2563eb]"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                                        {clause.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {clause.content}
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

