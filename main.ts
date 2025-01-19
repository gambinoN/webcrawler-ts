import { crawlPage } from "./crawl";
import { printReport } from "./report";

async function main() {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log("Incorrect number of arguments. Please provide a URL to crawl.");
    process.exit(1);
  }
  
  const baseUrl = process.argv[2];

  const pages = await crawlPage(baseUrl, baseUrl, new Set<string | undefined>());
  
  if (!pages) {
    console.log("No pages found.");
    return;
  }

  for (const page of Array.from(pages)) {
    console.log(page);
  }

  const pageCounts: Record<string, number> = {};
  for (const page of pages) {
    if (page) {
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    }
  }
  printReport(pageCounts);
}

main();