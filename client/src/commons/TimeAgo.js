export const TimeAgo = (date) => {
  const periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const diff = Date.now() - new Date(date);

  if (diff > periods.month) {
    return Math.floor(diff / periods.month) + ' tháng trước';
  } else if (diff > periods.week) {
    return Math.floor(diff / periods.week) + ' tuần trước';
  } else if (diff > periods.day) {
    return Math.floor(diff / periods.day) + ' ngày trước';
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + ' giờ trước';
  } else if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + ' phút trước';
  }
  return 'Vừa xong';
};
