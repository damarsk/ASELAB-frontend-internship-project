import Footer from "@/src/components/landing/Footer";
import LandingHeader from "../landing/LandingHeader";

type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export default function LegalPage({
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        <section
          id="overview"
          className="scroll-mt-24 border-b border-border bg-brand-primary-light"
        >
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              {description}
            </p>
            <p className="mt-6 text-sm text-text-muted">
              Terakhir diperbarui: {updatedAt}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <p className="mb-4 text-sm font-semibold text-text-primary">
              Daftar Isi
            </p>
            <nav aria-label="Daftar isi dokumen" className="space-y-1">
              <a
                href="#overview"
                className="block rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-primary-light hover:text-brand-primary"
              >
                Overview
              </a>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-primary-light hover:text-brand-primary"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-10">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-sm leading-7 text-text-secondary sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-text-secondary sm:text-base">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
