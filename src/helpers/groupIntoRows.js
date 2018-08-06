export default function (arr, length) {
    let res = [];
    for (let i = 0; i < arr.length; i += ROW_LENGTH) {
        res.push(arr.slice(i, i + ROW_LENGTH));
    }
    return res;
}
