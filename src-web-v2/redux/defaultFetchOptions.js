const getToken = () => {
  let token = null;
  try {
    token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  } catch (e) {
    // catch all. do nothing, token will be null
  }
  return token;
};

export const defaultOptions = {
  headers: {
    'CSRF-Token': getToken(),
  },
};

export const defaultPOSTOptions = {
  'Content-Type': 'application/json',
};

export const defaultPUTOptions = {
  'Content-Type': 'application/json; charset=utf-8',
};
