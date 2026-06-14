import TalentCard from "./TalentCard.jsx";
import { boxDefinitions, groupTalentsByBox } from "../utils/classifyTalent.js";

const matrixRows = [
  {
    potentialLabel: "High",
    boxes: ["B1", "B2", "B3"]
  },
  {
    potentialLabel: "Medium",
    boxes: ["B4", "B5", "B6"]
  },
  {
    potentialLabel: "Low",
    boxes: ["B7", "B8", "B9"]
  }
];

const performanceLabels = ["Low", "Medium", "High"];

const boxTone = {
  B1: "border-sky-200 bg-sky-50/70",
  B2: "border-cyan-200 bg-cyan-50/70",
  B3: "border-emerald-300 bg-emerald-50/80",
  B4: "border-yellow-200 bg-yellow-50/70",
  B5: "border-slate-200 bg-slate-50/80",
  B6: "border-lime-200 bg-lime-50/70",
  B7: "border-rose-200 bg-rose-50/70",
  B8: "border-orange-200 bg-orange-50/70",
  B9: "border-violet-200 bg-violet-50/70"
};

export default function MatrixGrid({ talents, selectedBoxId, onSelectBox }) {
  const groupedTalents = groupTalentsByBox(talents);

  return (
    <section className="w-full">
      <div className="mb-4 grid grid-cols-[88px_repeat(3,minmax(0,1fr))] gap-3">
        <div />
        {performanceLabels.map((label) => (
          <div
            key={label}
            className="rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-slate-700 shadow-sm"
          >
            Performance {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[88px_repeat(3,minmax(0,1fr))] gap-3">
        {matrixRows.map((row) => (
          <Row
            key={row.potentialLabel}
            potentialLabel={row.potentialLabel}
            boxIds={row.boxes}
            groupedTalents={groupedTalents}
            selectedBoxId={selectedBoxId}
            onSelectBox={onSelectBox}
          />
        ))}
      </div>
    </section>
  );
}

function Row({
  potentialLabel,
  boxIds,
  groupedTalents,
  selectedBoxId,
  onSelectBox
}) {
  return (
    <>
      <div className="flex min-h-64 items-center justify-center rounded-md bg-white px-3 py-4 text-center text-sm font-semibold text-slate-700 shadow-sm [writing-mode:vertical-rl]">
        Potential {potentialLabel}
      </div>

      {boxIds.map((boxId) => {
        const box = boxDefinitions[boxId];
        const boxTalents = groupedTalents[boxId] ?? [];
        const isSelected = selectedBoxId === boxId;

        return (
          <button
            key={boxId}
            type="button"
            onClick={() => onSelectBox(boxId)}
            className={`min-h-64 rounded-md border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
              isSelected ? "ring-2 ring-emerald-500 ring-offset-2" : ""
            } ${boxTone[boxId]}`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {box.id}
                </p>
                <h2 className="mt-1 text-base font-bold text-slate-950">
                  {box.title}
                </h2>
              </div>
              <span className="rounded bg-white/80 px-2 py-1 text-xs font-semibold text-slate-700">
                {boxTalents.length}명
              </span>
            </div>

            <div className="space-y-2">
              {boxTalents.map((talent) => (
                <TalentCard key={talent.employeeId} talent={talent} />
              ))}
            </div>
          </button>
        );
      })}
    </>
  );
}
