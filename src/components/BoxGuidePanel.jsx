import { boxDefinitions } from "../utils/classifyTalent.js";
import { boxGuides } from "../data/boxGuides.js";

const guideSections = [
  ["Box 의미", "meaning"],
  ["HRD 관점 해석", "hrdInterpretation"],
  ["권장 육성 방향", "developmentDirection"],
  ["추천 Stretch Assignment", "stretchAssignment"],
  ["추천 교육/코칭", "learningCoaching"]
];

export default function BoxGuidePanel({ boxId }) {
  const box = boxDefinitions[boxId];
  const guide = boxGuides[boxId];

  if (!box || !guide) {
    return (
      <aside className="rounded-md border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
        Box를 클릭하면 HRD 활용 가이드가 표시됩니다.
      </aside>
    );
  }

  return (
    <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-200 pb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
          {box.id} · {box.potential} Potential / {box.performance} Performance
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">{box.title}</h2>
      </div>

      <div className="mt-4 space-y-4">
        {guideSections.map(([label, key]) => (
          <section key={key}>
            <h3 className="text-sm font-bold text-slate-900">{label}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {guide[key]}
            </p>
          </section>
        ))}

        <section>
          <h3 className="text-sm font-bold text-slate-900">
            인재리뷰 회의 확인 질문
          </h3>
          <ul className="mt-2 space-y-2">
            {guide.reviewQuestions.map((question) => (
              <li
                key={question}
                className="rounded bg-slate-50 px-3 py-2 text-sm leading-5 text-slate-700"
              >
                {question}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
