import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface EmergencyBannerProps {
  /** The message displayed in the banner. Defaults to the current emergency notice. */
  message?: React.ReactNode;
  /** Custom icon or badge symbol. Defaults to "!" */
  badgeText?: React.ReactNode;
  /** Label for the action button. Defaults to "View" */
  buttonText?: string;
  /** Optional custom action when the button is clicked. If not provided, navigates to `viewHref`. */
  onView?: () => void;
  /** Target URL to navigate to when the button is clicked (default: "/admin/emergency"). Ignored if `onView` is provided. */
  viewHref?: string;
  /** Whether the action button is visible. Defaults to true. */
  showButton?: boolean;
  /** Extra container CSS classes. */
  className?: string;
  /** Extra action button CSS classes. */
  buttonClassName?: string;
}

export default function EmergencyBanner({
  message = "Emergency at Los Olivos Pool — reported 22 minutes ago",
  badgeText = "!",
  buttonText = "View",
  onView,
  viewHref = "/admin/emergency",
  showButton = true,
  className,
  buttonClassName,
}: EmergencyBannerProps) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onView) {
      onView();
    } else if (viewHref) {
      navigate(viewHref);
    }
  };

  return (
    <div
      className={cn(
        "bg-[#D6493C] text-white px-4 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 shadow-xs",
        className
      )}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="size-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
          {badgeText}
        </div>
        <span className="text-xs sm:text-sm font-medium truncate sm:whitespace-normal">
          {message}
        </span>
      </div>

      {showButton && (
        <button
          type="button"
          onClick={handleAction}
          className={cn(
            "px-3 sm:px-4 py-1 rounded-lg text-xs font-medium bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer border border-white/20 shrink-0",
            buttonClassName
          )}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export { EmergencyBanner as ReuseEmergencyBanner };

