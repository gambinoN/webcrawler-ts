const { JSDOM } = require('jsdom');

export function getURLsFromHtml(html: string, baseUrl: string) {
  const urls: Array<string> = [];
  const dom = new JSDOM(html);
  dom.window.document.querySelectorAll('a').forEach((a: any) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('http')) {
      urls.push(href);
    } else if (href && href.startsWith('/')) {
      urls.push(`${baseUrl}${href}`);
    }
  })
  return urls;
}

export default function normalizeUrl(url: string) {
  const urlObj = new URL(url);
  const webPath = `${urlObj.hostname}${urlObj.pathname}`
  const returnPath = (webPath.length > 0 && webPath.endsWith('/')) ? webPath.slice(0, -1) : webPath;

  return returnPath.toLowerCase();
}