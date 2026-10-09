import { MessageCircle, ShieldCheck } from "lucide-react";

export default function TeamHero({
  name,
  event,
  skills,
}: {
  name: string;
  event: string;
  skills: string[];
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex size-18 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-cyan-400 shadow-inner">
          <ShieldCheck className="size-10" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
                {name}
              </h1>
              <p className="mt-1 text-lg font-semibold text-text-secondary">
                {event}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Dibuat oleh <strong>Anindya</strong> • Team Leader
              </p>
            </div>
            <span className="h-fit rounded-md border border-emerald-200 bg-emerald-50 px-12 py-1.5 text-center text-sm font-medium text-emerald-700">
              Joined
            </span>
          </div>
          <div className="mt-7 border-t border-border pt-5">
            <h2 className="text-xs font-bold text-text-primary">
              Deskripsi Tim Lomba
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-text-secondary">
              Fokus pada pengembangan solusi platform digital inklusif berbasis
              kecerdasan buatan untuk akselerasi UMKM nasional. Kami mencari
              talenta yang berdedikasi dan siap berkolaborasi secara intensif
              menuju babak final kompetisi.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-emerald-500">
              <MessageCircle className="size-5" aria-label="WhatsApp group" />
              <MessageCircle
                className="size-5 text-indigo-500"
                aria-label="Discord channel"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
