export default function Drip({ flip = false }: { flip?: boolean }) {
  return (
    <svg className="drip" viewBox="0 0 1200 60" preserveAspectRatio="none" style={flip ? { transform: "scaleY(-1)" } : undefined} aria-hidden>
      <path
        fill="currentColor"
        d="M0 0h1200v6c-30 0-34 4-36 18-2 16-12 16-13 0-1-10-8-12-30-12H880c-14 0-16 6-17 30-1 22-14 22-15 0-1-20-4-30-24-30H520c-12 0-15 4-16 14-2 14-11 14-12 0 0-10-6-14-20-14H260c-16 0-18 8-19 34-1 18-13 18-14 0-1-26-5-34-22-34H60C40 12 36 16 34 26c-2 10-10 10-11 0C22 14 16 6 0 6z"
      />
    </svg>
  );
}
