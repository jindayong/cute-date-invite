export default function TalentCard({ talent }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{talent.name}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {talent.department} · {talent.grade}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          {talent.cotStatus === "Y" && (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              COT
            </span>
          )}
          {talent.successionCandidate === "Y" && (
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
              Succ.
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded bg-slate-50 px-2 py-1">
          <span className="block text-slate-500">Performance</span>
          <strong className="text-slate-900">{talent.performanceScore.toFixed(1)}</strong>
        </div>
        <div className="rounded bg-slate-50 px-2 py-1">
          <span className="block text-slate-500">Potential</span>
          <strong className="text-slate-900">{talent.potentialScore.toFixed(1)}</strong>
        </div>
      </div>
    </article>
  );
}
