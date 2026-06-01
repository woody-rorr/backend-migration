export function calculateRankingReward(rank, _longestWinStreak, _totalParticipants, currentRankPercentile) {
  if (rank === 1) return 3000;
  if (rank === 2) return 1000;
  if (rank === 3) return 700;
  if (rank === 4) return 500;
  if (rank === 5) return 400;
  if (currentRankPercentile <= 0.005) return 300;
  if (currentRankPercentile <= 0.03) return 200;
  if (currentRankPercentile <= 0.1) return 100;
  if (currentRankPercentile <= 0.25) return 50;
  if (currentRankPercentile <= 0.5) return 20;
  return 0;
}

export function getRankingGrade(rank, _longestWinStreak, currentRankPercentile) {
  if (rank === 1) return '1st';
  if (rank === 2) return '2nd';
  if (rank === 3) return '3rd';
  if (rank === 4) return '4th';
  if (rank === 5) return '5th';
  if (currentRankPercentile <= 0.005) return 'Diamond';
  if (currentRankPercentile <= 0.03) return 'Platinum';
  if (currentRankPercentile <= 0.1) return 'Gold';
  if (currentRankPercentile <= 0.25) return 'Silver';
  if (currentRankPercentile <= 0.5) return 'Bronze';
  return 'Participant';
}
