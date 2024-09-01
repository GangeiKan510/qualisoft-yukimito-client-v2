export const sortBookings = (bookings: any[], criteria: string): any[] => {
  let sortedBookings = [...bookings];
  switch (criteria) {
    case "by Service":
      sortedBookings.sort((a, b) => a.service.localeCompare(b.service));
      break;
    case "Price Ascending":
      sortedBookings.sort((a, b) => a.total_bill - b.total_bill);
      break;
    case "Price Descending":
      sortedBookings.sort((a, b) => b.total_bill - a.total_bill);
      break;
    case "Latest":
      sortedBookings.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "Oldest":
      sortedBookings.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      break;
    default:
      break;
  }
  return sortedBookings;
};
