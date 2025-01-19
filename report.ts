export function sortPages(pages: Record<string, number>) {
    const pagesArray = Object.entries(pages);

    pagesArray.sort((a, b) => {
        return b[1] - a[1];
    });

    return pagesArray;
}

export function printReport(pages: Record<string, number>) {
    console.log('=== Pages ===');
    const sortedPages = sortPages(pages);

    for (const [page, count] of sortedPages) {
        console.log(`${page}: ${count}`);
    }
}