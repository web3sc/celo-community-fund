// services/fileService.js
const fs = require('fs');
const path = require('path');

function writeToFile(filePath, data) {
  fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(data, null, 2));
}

async function removeDraft(draft) {
    // TODO: Implement logic to remove draft
  }
  
async function addCurrentInitiative(initiative) {
// TODO: Implement logic to add current initiative
}

async function addDraft(draft) {
// TODO: Implement logic to add draft
}

module.exports = writeToFile;