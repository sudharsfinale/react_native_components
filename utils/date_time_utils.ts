import moment from "moment";
function formatTime(dateString: string | null | undefined): string {
  if (!dateString || !moment(dateString, moment.ISO_8601, true).isValid()) {
    return "Invalid Date";
  }

  return moment(dateString).format("HH:mm");
}
function formatShortDate(dateString: string | null | undefined): string {
    if (!dateString || !moment(dateString, moment.ISO_8601, true).isValid()) {
        return "Invalid Date";
    }

    return moment(dateString).format("DD MMM");
}
export { formatTime, formatShortDate };
