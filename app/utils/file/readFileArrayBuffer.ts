interface FileType {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: string;
}

export const readFileArrayBuffer = (file: FileType) => {
  // return new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.onload = () => resolve(new Uint8Array(reader.result));
  //   reader.onerror = reject;
  //   reader.readAsArrayBuffer(file);
  // });
};
