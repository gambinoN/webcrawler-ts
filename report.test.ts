import { test, expect } from '@jest/globals';
import { sortPages } from './report';

test('sortPages strip protocol', () => {
    const input = {
        'https://example.com': 3,
        'https://example.com/path': 1,
    };
    const actual = sortPages(input);
    const expected = [['https://example.com', 3], ['https://example.com/path', 1]];

    expect(actual).toStrictEqual(expected);
})
