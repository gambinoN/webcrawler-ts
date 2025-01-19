const { JSDOM } = require('jsdom');

export async function crawlPage(url: string, currentUrl: string, visited: Set<string | undefined>) {
  const baseUrlObj = new URL(url);
  const currentUrlObj = new URL(currentUrl);
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    console.error('Cannot crawl external links');
    return visited;
  }

  const normalizedCurrentUrl = normalizeUrl(currentUrl);
  if (visited.has(normalizedCurrentUrl)) {
    return visited;
  }

  visited.add(normalizedCurrentUrl);

  try {
    const resp = await fetch(url)
    if(resp.status > 299) {
      console.error(`Failed to fetch page: ${resp.statusText}`);
      return;
    }
    const contentType = resp.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      console.error('Page is not HTML');
      return;
    }
    const html = await resp.text();

    const nextUrls = getURLsFromHtml(html, url);
    for (const nextUrl of nextUrls) {
      visited = await crawlPage(nextUrl, url, visited) || visited;
    }
  } catch (e: any) {
    console.error(e.message);
  }

  return visited;
}

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