export const dateFilter = (unixTimeStap: number): string => {
    return new Date (unixTimeStap).toDateString();
}