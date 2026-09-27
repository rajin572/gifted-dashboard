import { cn } from "@/lib/utils";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";

export interface ReuseTabOption {
  label: string;
  value: string;
  badge?: number;
}

interface ReuseTabsProps {
  options: ReuseTabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ReuseTabs: React.FC<ReuseTabsProps> = ({ options, value, onChange, className }) => {
  const scrollRef = useDraggableScroll<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-background-color p-1 max-w-full overflow-x-auto scrollbar-none select-none cursor-grab active:cursor-grabbing touch-pan-x",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap",
            value === option.value
              ? "bg-primary-color text-base-color shadow-sm"
              : "text-secondbase-color hover:text-base-color"
          )}
        >
          {option.label}
          {typeof option.badge === "number" && option.badge > 0 && (
            <span className="flex items-center justify-center size-4 rounded-full bg-red-500 text-white text-[10px] font-semibold">
              {option.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ReuseTabs;
