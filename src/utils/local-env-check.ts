const $local_env =
  process.env.NODE_ENV === 'development' &&
  (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
export { $local_env };
