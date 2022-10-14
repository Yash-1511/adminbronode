export const formatDuration = duration => {
  let time = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':');

  return time[0] !== '00'
    ? time[0] + ' giờ ' + time[1] + ' phút'
    : time[1] + ' phút';
};
