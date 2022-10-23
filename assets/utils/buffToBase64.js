function base64encode(data) {
  return btoa(data.map((v) => String.fromCharCode(v)).join(""));
}

export default base64encode;
