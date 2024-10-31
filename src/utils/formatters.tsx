export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    weekday: "short",
    month: "2-digit",
  }).format(new Date(date));
};

export const formatTime = (time: string) => {
  return new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(time));
};

export const formatDegrees = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "celsius",
  }).format(number);
};
