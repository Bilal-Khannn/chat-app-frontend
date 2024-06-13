export function convertTo12HourFormat(timestamp: string): string {
    const date: Date = new Date(timestamp);
    const utcDate: Date = new Date(date.toUTCString()); // Convert to UTC
    const hours: number = utcDate.getHours();
    const minutes: number = utcDate.getMinutes();
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    const twelveHourFormatHours: number = hours % 12 || 12;
    const formattedTime: string = `${twelveHourFormatHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return formattedTime;
}
