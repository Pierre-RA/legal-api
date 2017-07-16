// import docxtemplater = require("docxtemplater");

interface Docxtemplater {
  loadZip(file: any): void;
  getZip(): any;
  setData(json: Object): void;
  render(): void;
}

declare var Docxtemplater: {
  (): Docxtemplater;
  new(): Docxtemplater;
}

declare module "docxtemplater" {
  export = Docxtemplater;
}
