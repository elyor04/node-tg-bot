import formatDate from "../../utils/formatDate";
import Period from "../../types/period";

const getDates = (period: Period) => {
  const now = Date.now();

  if (period?.days)
    return {
      start: formatDate(
        new Date(now - period.days * 24 * 60 * 60 * 1000),
        "YYYY-MM-DD"
      ),
      end: formatDate(new Date(now), "YYYY-MM-DD"),
    };

  if (period?.weeks)
    return {
      start: formatDate(
        new Date(now - period.weeks * 7 * 24 * 60 * 60 * 1000),
        "YYYY-MM-DD"
      ),
      end: formatDate(new Date(now), "YYYY-MM-DD"),
    };

  if (period?.months)
    return {
      start: formatDate(
        new Date(now - period.months * 30 * 24 * 60 * 60 * 1000),
        "YYYY-MM-DD"
      ),
      end: formatDate(new Date(now), "YYYY-MM-DD"),
    };
};

export default getDates;
