export default function convertToDate(unixTime) {
    const date = new Date(unixTime*1000);
    return date.toLocaleDateString("en-US")
}
