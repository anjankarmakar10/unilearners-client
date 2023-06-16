const getDate = (date) => {
  const givenDate = new Date(date);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return givenDate.toLocaleString("en-US", options);
};

export default getDate;
