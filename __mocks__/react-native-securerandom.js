
// Import this named export into your test file:
module.exports = {
    generateSecureRandom: jest.fn(() => {
        return new Promise((resolve) => {
            const a = new Uint8Array(1);
            a[0] = 4; // chosen by fair dice roll. guaranteed to be random. xkcd.com/221
            resolve(a);
        })
    })
}
