
// Import this named export into your test file:
module.exports = {
    generateSecureRandom: jest.fn(() => {
        return new Promise((resolve) => {
            resolve(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0].map(
                () => Math.floor(Math.random() * 256)
            )));
        })
    })
}
