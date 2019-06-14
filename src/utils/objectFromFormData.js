function objectFromFormData(fd) {
  const object = {};
  for (let key of fd.keys()) {
    object[key] = fd.get(key);
  }
  return object;
}

export default objectFromFormData;
