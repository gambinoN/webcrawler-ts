import normalizeUrl, { getURLsFromHtml } from './crawl';
import { test, expect } from '@jest/globals';

test('normalizeUrl strip protocol', () => {
    const input = 'https://example.com';
    const actual = normalizeUrl(input);
    const expected = 'example.com';

    expect(actual).toBe(expected);
})

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://example.com/';
    const actual = normalizeUrl(input);
    const expected = 'example.com';

    expect(actual).toBe(expected);
})

test('normalizeUrl capitals', () => {
    const input = 'https://Example.com/';
    const actual = normalizeUrl(input);
    const expected = 'example.com';

    expect(actual).toBe(expected);
})

test('getURLsFromHtml absolute', () => {
    const input = `
    <html>
        <body>
            <a href="https://example.com">Example</a>
        </body>
    </html>
    `;
    const actual = getURLsFromHtml(input, 'https://example.com');
    const expected: Array<string> = ['https://example.com'];

    expect(actual).toEqual(expected);
})

test('getURLsFromHtml relative', () => {
    const input = `
    <html>
        <body>
            <a href="/path/">Example</a>
        </body>
    </html>
    `;
    const actual = getURLsFromHtml(input, 'https://example.com');
    const expected: Array<string> = ['https://example.com/path/'];

    expect(actual).toEqual(expected);
})

test('getURLsFromHtml invalid', () => {
    const input = `
    <html>
        <body>
            <a href="invalid">invalid</a>
        </body>
    </html>
    `;
    const actual = getURLsFromHtml(input, 'https://example.com');
    const expected: Array<string> = [];

    expect(actual).toEqual(expected);
})