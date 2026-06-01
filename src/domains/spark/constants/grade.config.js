export const SPARK_GRADE_TIERS = [
  { gradeId: 1, minExp: 0, maxExp: 99, gradeName: 'New Fan' },
  { gradeId: 2, minExp: 100, maxExp: 299, gradeName: 'Active Watcher' },
  { gradeId: 3, minExp: 300, maxExp: 699, gradeName: 'Rising Supporter' },
  { gradeId: 4, minExp: 700, maxExp: 1499, gradeName: 'Core Fan' },
  { gradeId: 5, minExp: 1500, maxExp: 2999, gradeName: 'Strategic Booster' },
  { gradeId: 6, minExp: 3000, maxExp: 5999, gradeName: 'Super Fan' },
  { gradeId: 7, minExp: 6000, maxExp: 9999, gradeName: 'MVP Supporter' },
  { gradeId: 8, minExp: 10000, maxExp: 17999, gradeName: 'Legendary Fan' },
  { gradeId: 9, minExp: 18000, maxExp: 29999, gradeName: 'Honorary Captain' },
  { gradeId: 10, minExp: 30000, maxExp: 45000, gradeName: 'Hall of Fame' },
];

export function getGradeByExp(exp) {
  const v = Math.max(0, Math.floor(Number(exp)));
  const tier = SPARK_GRADE_TIERS.find((t) => v >= t.minExp && v <= t.maxExp);
  return tier ? tier.gradeId : SPARK_GRADE_TIERS[SPARK_GRADE_TIERS.length - 1].gradeId;
}

export function getGradeNameByExp(exp) {
  const v = Math.max(0, Math.floor(Number(exp)));
  const tier = SPARK_GRADE_TIERS.find((t) => v >= t.minExp && v <= t.maxExp);
  return tier ? tier.gradeName : SPARK_GRADE_TIERS[SPARK_GRADE_TIERS.length - 1].gradeName;
}
