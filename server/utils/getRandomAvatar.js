// get random avatars from http://avatars.adorable.io/
const getRandomAvatar = () => {
  return `https://api.adorable.io/avatars/face/eyes${getRandomInt(1, 9)}/nose${getRandomInt(1, 9)}/mouth${getRandomInt(1, 9)}/${getRandomColor()}`;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

module.exports = getRandomAvatar;
