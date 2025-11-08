export function formatReadableDate(date?: Date): string {
    if (!date) return "無し";
    const year = date.getFullYear();
    const nowYear = new Date().getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (year !== nowYear) {
        return `${year}年${month}月${day}日 ${hours}:${minutes}`;
    }
    return `${month}月${day}日 ${hours}:${minutes}`;
}
