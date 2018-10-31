export default function (arr=[], length) {
    let res = [];
    for (let i = 0; i < arr.length; i += length) {
        res.push(arr.slice(i, i + length));
    }
    return res;
}
