export default function CompetitionPlaceholder({
  competition,
}: {
  competition?: { name: string };
}) {
  return (
    <img
      src="https://placehold.co/448x288?text=Competition+Placeholder"
      alt={
        competition
          ? `Placeholder ${competition.name}`
          : "Placeholder gambar kompetisi"
      }
      className="mx-auto h-28 w-full max-w-48 border border-border object-cover sm:h-32"
    />
  );
}
