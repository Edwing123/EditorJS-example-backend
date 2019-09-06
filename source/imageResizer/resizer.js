const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');


// class ? really 
class Resizer {
  constructor(folder, fileName) {
    this.folder = folder;
    this.fileName = fileName;
  }

  async save(buffer) {
    const fileName = this.fileName;
    const filePath = this.filePath(fileName);

    await sharp(buffer)
      .resize(1000, 1000, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filePath);

      return fileName;
  }

  filePath(fileName) {
    return path.resolve(`${this.folder}/${fileName}`);
  }
}


module.exports = Resizer;