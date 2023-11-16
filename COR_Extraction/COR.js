import { getCorInfo } from './CORExtractor.js';

//
// Main (self-executing async function)
(async function main() {
 const filePath = './cor-pdfs/BALILING_COMSCI-LEAD.pdf';

 try {
  const output = await getCorInfo(filePath);
  const structure = JSON.stringify(output, null, 4);

  console.log(structure);
 } catch (error) {
  console.error('Error in main:', error);
 }
})();
