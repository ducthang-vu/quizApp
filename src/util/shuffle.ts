/**
 * Given an array, return a new array the same items of the given one but randomly sorted.
 *
 * @param list - an array containing the items
 * @return the new sorted array
 */
export function shuffle<T>(list: T[]): T[] {
    const listCopy: T[] = [...list];
    for (let i: number = listCopy.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [listCopy[i], listCopy[j]] = [listCopy[j], listCopy[i]];
    }
    return listCopy;
}
