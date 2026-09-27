import { ArrowRight } from "lucide-react";

export type Competition = {
  name: string;
  category: string;
  detail: string;
  prize: string;
  logo: string;
  logoClassName: string;
};

export default function CompetitionSection({
  competitions,
}: {
  competitions: Competition[];
}) {
  return (
    <section className="mt-24" aria-labelledby="competitions-heading">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="competitions-heading"
          className="text-2xl font-bold text-text-primary sm:text-3xl"
        >
          Kompetisi Untukmu!
        </h2>
        <button className="hidden shrink-0 items-center gap-2 text-lg font-semibold text-brand-primary hover:text-brand-primary-hover sm:flex">
          Lihat Semua <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {competitions.map((competition) => (
          <article
            key={competition.name}
            className="flex min-h-101.25 flex-col items-center border border-border bg-white px-6 py-6 text-center transition-shadow hover:shadow-md"
          >
            <div
              className={`flex h-36 w-full items-center justify-center whitespace-pre-line text-center text-xl font-bold leading-none ${competition.logoClassName}`}
              aria-label={`Logo ${competition.name}`}
            >
              {competition.logo}
            </div>
            <h3 className="mt-6 max-w-xs text-base font-bold leading-6 text-text-primary">
              {competition.name}
            </h3>
            <p className="mt-4 max-w-xs text-xs leading-4 text-text-secondary">
              Kategori {competition.category}, {competition.detail}
            </p>
            <p className="mt-3 text-[11px] text-text-secondary">Total Hadiah</p>
            <p className="mt-1 text-2xl font-medium text-text-secondary">
              {competition.prize}
            </p>
            <button className="mt-auto inline-flex items-center gap-1 rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover">
              Eksplorasi &amp; Cari Rekan{" "}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
