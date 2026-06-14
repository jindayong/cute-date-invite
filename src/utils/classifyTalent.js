export const defaultThresholds = {
  performance: {
    medium: 3.0,
    high: 4.0
  },
  potential: {
    medium: 3.0,
    high: 4.0
  }
};

export const boxDefinitions = {
  B1: {
    id: "B1",
    title: "Potential Talent",
    potential: "High",
    performance: "Low"
  },
  B2: {
    id: "B2",
    title: "Growth Leader",
    potential: "High",
    performance: "Medium"
  },
  B3: {
    id: "B3",
    title: "Future Executive",
    potential: "High",
    performance: "High"
  },
  B4: {
    id: "B4",
    title: "Inconsistent Performer",
    potential: "Medium",
    performance: "Low"
  },
  B5: {
    id: "B5",
    title: "Core Contributor",
    potential: "Medium",
    performance: "Medium"
  },
  B6: {
    id: "B6",
    title: "High Performer",
    potential: "Medium",
    performance: "High"
  },
  B7: {
    id: "B7",
    title: "Under Fit",
    potential: "Low",
    performance: "Low"
  },
  B8: {
    id: "B8",
    title: "Solid Professional",
    potential: "Low",
    performance: "Medium"
  },
  B9: {
    id: "B9",
    title: "Expert Performer",
    potential: "Low",
    performance: "High"
  }
};

const boxMap = {
  "High-Low": "B1",
  "High-Medium": "B2",
  "High-High": "B3",
  "Medium-Low": "B4",
  "Medium-Medium": "B5",
  "Medium-High": "B6",
  "Low-Low": "B7",
  "Low-Medium": "B8",
  "Low-High": "B9"
};

export function getLevel(score, thresholds) {
  if (score >= thresholds.high) {
    return "High";
  }

  if (score >= thresholds.medium) {
    return "Medium";
  }

  return "Low";
}

export function getBox(performanceScore, potentialScore, thresholds) {
  const performance = getLevel(performanceScore, thresholds.performance);
  const potential = getLevel(potentialScore, thresholds.potential);

  return boxMap[`${potential}-${performance}`];
}

export function classifyTalent(talent, thresholds = defaultThresholds) {
  const performanceLevel = getLevel(
    talent.performanceScore,
    thresholds.performance
  );
  const potentialLevel = getLevel(talent.potentialScore, thresholds.potential);
  const boxId = getBox(
    talent.performanceScore,
    talent.potentialScore,
    thresholds
  );

  return {
    ...talent,
    performanceLevel,
    potentialLevel,
    boxId,
    boxTitle: boxDefinitions[boxId].title
  };
}

export function groupTalentsByBox(talents) {
  return Object.keys(boxDefinitions).reduce((groups, boxId) => {
    groups[boxId] = talents.filter((talent) => talent.boxId === boxId);
    return groups;
  }, {});
}
