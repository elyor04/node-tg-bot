const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

const formatDate = (date: Date, format: string) => {
  const map: any = {
    YYYY: zeroPad(date.getFullYear(), 4),
    MM: zeroPad(date.getMonth() + 1, 2),
    DD: zeroPad(date.getDate(), 2),
    HH: zeroPad(date.getHours(), 2),
    mm: zeroPad(date.getMinutes(), 2),
    ss: zeroPad(date.getSeconds(), 2),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
};

export default formatDate;
