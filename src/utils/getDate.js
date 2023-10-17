export const getDate = date => {
    const creationDate = new Date(date.createdAt);
    const year = creationDate.getFullYear();
    const month = creationDate.getMonth() + 1;
    const day = creationDate.getDate();
    return `${day}-${month}-${year}`;
};
