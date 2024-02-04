import { shuffle } from '../util/shuffle';

describe('shuffle', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })

    const list: number[] = [10, 5, 3, 6, 7, 15, 12, 1, 3, 5, 18, 6, 1, 1];
    const expected = [10, 5, 5, 1, 3, 6, 6, 3, 7, 18, 15, 1, 12, 1];

    it('should return the given list randomly sorted', () => {
        expect(shuffle(list)).toEqual(expected);
    })
})
