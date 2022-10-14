export const displayIcon = (displayIcon, hideIcon) => {
  document.querySelector(displayIcon).style.display = 'flex';
  document.querySelector(hideIcon).style.display = 'none';
};

export const hideIcon = (hideIcon, displayIcon) => {
  document.querySelector(hideIcon).style.display = 'none';
  document.querySelector(displayIcon).style.display = 'flex';
};
