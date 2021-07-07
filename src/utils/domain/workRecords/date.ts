export function formatHourAndMinutes(time: string) {
  const hm = time.includes(" ") ? time.split(" ")[1] : time;
  const [hour, minutes] = hm.split(":");

  return `${hour}:${minutes}`;
}
