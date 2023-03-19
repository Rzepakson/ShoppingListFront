export const formatDate = (date: string) => {
    const stringToDate = new Date(date)

    let day, month, year;

    day = stringToDate.getDate();
    month = stringToDate.getMonth() + 1;
    year = stringToDate.getFullYear();

    day = day
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${day}.${month}.${year}`;
};