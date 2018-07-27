jest.mock('react-native-securerandom')
import { generateSecureRandom } from 'react-native-securerandom';
import Randal from '../randal';

beforeEach(async (done) => {
    this.randal = new Randal();
    await this.randal.init();
    done();
})

test('randal defined', () => {
    expect(this.randal).toBeDefined;
})

test('short distance', () => {
    let x = Randal.DistanceThreshold / 2;
    this.randal.checkPoint(x, x);
    expect(this.randal.steps).toBe(0);
})

test('sufficient distance', () => {
    let x = Randal.DistanceThreshold * 2;
    this.randal.checkPoint(x, x);
    expect(this.randal.steps).toBe(1);
})

test('percentage is correct', () => {
    let flipper = 1;
    let ratio = 10;
    for (let i = 0, l = Randal.Quota / ratio; i < l; i++) {
        let x = (Randal.DistanceThreshold * 2) * flipper;
        this.randal.checkPoint(x, x);
        flipper *= -1;
    }
    // only tests > 0 because an internal constant controls how much
    expect(this.randal.getPercentage()).toBe(100 / ratio);
})

test('invalid update event listener', () => {
    expect(() => this.randal.onUpdate(null)).toThrowError(Randal.UpdateFunctionError);
})

test('invalid done event listener', () => {
    expect(() => this.randal.onDone(null)).toThrowError(Randal.DoneFunctionError);
})

test('invalid x', () => {
    expect(() => this.randal.checkPoint(null, 42)).toThrowError(Randal.CheckPointArgumentError);
})

test('invalid y', () => {
    expect(() => this.randal.checkPoint(42, null)).toThrowError(Randal.CheckPointArgumentError);
})

test('infinite x', () => {
    expect(() => this.randal.checkPoint(Number.POSITIVE_INFINITY, 0)).toThrowError(Randal.CheckPointInfiniteError);
})

test('infinite y', () => {
    expect(() => this.randal.checkPoint(0, Number.NEGATIVE_INFINITY)).toThrowError(Randal.CheckPointInfiniteError);
})
