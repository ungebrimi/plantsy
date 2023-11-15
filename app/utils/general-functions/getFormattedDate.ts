export function getFormattedDate(date: any) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  let formattedDate;

  if (timeDifference < 86400000) {
    // Less than a day
    formattedDate = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (timeDifference < 604800000) {
    // Less than a week
    formattedDate = date.toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return formattedDate;
}
