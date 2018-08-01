export default function getVacancyTime(createdTime) {
  return Math.ceil((new Date().getTime() - createdTime) / 86400000);
}
