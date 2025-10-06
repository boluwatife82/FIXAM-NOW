window.Validators = (function () {
  function isEmail(v) {
    return /\S+@\S+\.\S+/.test(v);
  }
  function isPhone(v) {
    return /^\+?\d{7,15}$/.test(v.replace(/\s+/g, ""));
  }
  function strongPassword(v) {
    return v && v.length >= 6;
  }
  function imageFileValid(file) {
    const ok = ["image/jpeg", "image/png"];
    return file && ok.includes(file.type) && file.size <= 1.6e6;
  }
  return { isEmail, isPhone, strongPassword, imageFileValid };
})();
