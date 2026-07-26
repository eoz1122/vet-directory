export default function MapLoadingState() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="h-full min-h-80 w-full flex flex-col items-center justify-center gap-4 bg-secondary/30 p-8 text-center"
        >
            <span
                aria-hidden="true"
                className="h-10 w-10 animate-spin rounded-full border-4 border-primary/15 border-t-primary"
            />
            <span className="font-bold text-primary/80">Loading directory map...</span>
            <span className="text-sm text-primary/60">
                The practice list is ready while the interactive map loads.
            </span>
        </div>
    );
}
