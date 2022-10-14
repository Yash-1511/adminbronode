export const Scroll = element => {
  document.querySelector(element).scrollIntoView({ behavior: 'smooth' });
};
