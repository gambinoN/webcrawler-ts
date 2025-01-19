import { crawlPage } from "./crawl";

function main() {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log("Incorrect number of arguments. Please provide a URL to crawl.");
    process.exit(1);
  }
  
  const baseUrl = process.argv[2];

  crawlPage(baseUrl);
  console.log(`Crawling ${baseUrl}...`);
}

main();