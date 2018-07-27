
// Import this named export into your test file:
module.exports = {
    generateSecureRandom: jest.fn((length) => {
        return new Promise((resolve) => {
            const arr = (new Array(length)).fill(0)
            resolve(Uint8Array.from(arr.map(
                () => Math.floor(Math.random() * 256)
            )));
        })
    })
}
