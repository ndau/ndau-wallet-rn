export default function (arr, length) {
    let res = [];
    for (let i = 0; i < this.props.shuffledWords.length; i += ROW_LENGTH) {
        res.push(this.props.shuffledWords.slice(i, i + ROW_LENGTH));
    }
    return res;
}
