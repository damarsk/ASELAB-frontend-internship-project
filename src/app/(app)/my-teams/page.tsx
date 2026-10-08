import Link from "next/link";
import { ArrowRight, Plus, UsersRound } from "lucide-react";
import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";
import { teams } from "@/src/data/teams";

export default function MyTeamPage() {
  const myTeams = teams.slice(0, 3);

  return (
    <>
      <DashHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Tim Saya
            </h1>
            <p className="mt-2 text-sm text-text-secondary sm:text-base">
              Pilih tim yang ingin kamu kelola dan lanjutkan perjalanan
              kompetisimu.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 self-start rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover sm:self-auto"
          >
            <Plus className="size-4" aria-hidden="true" /> Buat Tim Baru
          </button>
        </div>
        {myTeams.length > 0 ? (
          <section className="mt-8" aria-labelledby="my-teams-heading">
            <div className="flex items-center justify-between gap-4">
              <h2
                id="my-teams-heading"
                className="text-lg font-semibold text-text-primary"
              >
                Tim yang kamu ikuti
              </h2>
              <span className="text-sm text-text-muted">
                {myTeams.length} tim
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {myTeams.map((team) => (
                <article
                  key={team.id}
                  className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-success-light text-2xl">
                    👩🏻‍💼
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-text-primary">
                      {team.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{team.event}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-text-secondary">
                        Skill Dibutuhkan
                      </span>
                      {team.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-success-light px-2.5 py-1 text-[11px] text-brand-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                      <UsersRound className="size-3.5" aria-hidden="true" /> 2/4
                      Anggota
                    </span>
                    <Link
                      href={`/my-teams/${team.id}`}
                      className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
                    >
                      Lihat Tim{" "}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-8 flex min-h-85 flex-col items-center justify-center rounded-xl border border-border bg-white px-6 py-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-success-light text-brand-primary">
              <UsersRound
                className="size-10"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-text-primary">
              Kamu belum punya tim
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary">
              Buat tim untuk kompetisi yang ingin kamu ikuti dan temukan anggota
              dengan skill yang dibutuhkan.
            </p>
            <button
              type="button"
              className="mt-5 flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-hover"
            >
              <Plus className="size-4" aria-hidden="true" /> Buat Tim Baru
            </button>
            <p className="mt-4 text-xs text-text-muted">
              Tim yang kamu buat atau ikuti akan muncul di sini.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
