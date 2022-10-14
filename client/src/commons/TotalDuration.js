export const TotalDuration = (durations) => {
  let result = 0;
  durations.forEach((element) => {
    const [minute, second] = element.split(':');
    result += (parseInt(minute) * 60 + parseInt(second)) * 1000;
  });

  return new Date(result).toISOString().substr(14, 5);
};
