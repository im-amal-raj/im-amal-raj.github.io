export default function ScrollToTop() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label="Scroll back to top of page"
      className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] shadow-xs transition-colors hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] active:scale-[0.98]"
    >
      <span>Back to top</span>
      <span aria-hidden="true">&uarr;</span>
    </button>
  );
}
