const a = "2016-12-25";
const unix = new Date(a).getTime() / 1000;
const numDate = new Date(unix);
const utc = numDate.toUTCString();
console.log(utc);
