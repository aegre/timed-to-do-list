const formatNumber = number => (
    number < 10 ? `0${number}` : number
)

export const secondToMinutes = seconds => {
    const totalSeconds = seconds % 60;
    let totalMinutes = parseInt(seconds / 60, 10);
    const totalHours = parseInt(totalMinutes / 60, 10);
    totalMinutes = totalMinutes % 60;
    return `${formatNumber(totalHours)}:${formatNumber(totalMinutes)}:${formatNumber(totalSeconds)}` 
}
