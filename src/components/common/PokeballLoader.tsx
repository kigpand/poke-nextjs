type Props = {
  className?: string;
};

export default function PokeballLoader({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-label="로딩 중"
    >
      <circle cx="50" cy="50" r="48" fill="#f5f5f5" />
      <path d="M2 50a48 48 0 0 1 96 0" fill="#e53935" />
      <rect x="2" y="46" width="96" height="8" fill="#111111" />
      <circle cx="50" cy="50" r="14" fill="#f5f5f5" stroke="#111111" strokeWidth="6" />
    </svg>
  );
}
