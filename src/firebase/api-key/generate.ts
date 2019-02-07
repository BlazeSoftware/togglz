export default () =>
  new Array(20)
    .fill(undefined)
    .map(() => 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 36)))
    .join('');
