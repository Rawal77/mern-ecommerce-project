export const setInForm = (ev, state, cb) => {
  const { name, value } = ev.target;
  cb({
    ...state,
    [name]: value,
  });
};
