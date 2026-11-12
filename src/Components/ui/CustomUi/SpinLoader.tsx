const SpinLoader = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <svg
        viewBox="0 0 80 80"
        className="size-16 sm:size-20"
        role="img"
        aria-label="Loading"
      >
        <ellipse cx="40" cy="72" rx="16" ry="3" className="fill-base-color/10">
          <animate
            attributeName="rx"
            values="16;12;16"
            dur="1.4s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
          />
        </ellipse>

        <rect x="18" y="38" width="44" height="30" rx="4" className="fill-secondary-color" />
        <rect x="36" y="38" width="8" height="30" className="fill-primary-color" />

        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 -10;0 0"
            dur="1.4s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
          />
          <rect x="14" y="28" width="52" height="12" rx="3" className="fill-secondary-color" />
          <rect x="36" y="28" width="8" height="12" className="fill-primary-color" />
          <ellipse
            cx="31"
            cy="23"
            rx="8"
            ry="5"
            transform="rotate(-20 31 23)"
            className="fill-none stroke-secondary-color"
            strokeWidth="3"
          />
          <ellipse
            cx="49"
            cy="23"
            rx="8"
            ry="5"
            transform="rotate(20 49 23)"
            className="fill-none stroke-secondary-color"
            strokeWidth="3"
          />
          <circle cx="40" cy="26" r="3.5" className="fill-secondary-color" />
        </g>

        <circle cx="24" cy="26" r="1.6" className="fill-coral-accent">
          <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="58" cy="22" r="1.6" className="fill-coral-accent">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1.4s"
            begin="0.35s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="40" cy="8" r="1.6" className="fill-coral-accent">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1.4s"
            begin="0.7s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <span className="text-xs font-medium text-base-color/50">Loading...</span>
    </div>
  );
};

export default SpinLoader;
