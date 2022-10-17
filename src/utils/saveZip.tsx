import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import { zipFolder } from './consts';

const saveZip = (filename: string, images: any []) => {
  if (!images) return;

  const zip = new JSZip();
  const folder = zip.folder(zipFolder);

  images.forEach((image) => {
    const blobPromise = fetch(image.url).then((r) => {
      if (r.status === 200) return r.blob();
      return Promise.reject(new Error(r.statusText));
    });
    const name = image.url.substring(image.url.lastIndexOf('/') + 1);
    folder?.file(name, blobPromise);
  });

  zip.generateAsync({ type: 'blob' }).then((blob) => saveAs(blob, filename));
};

export default saveZip;
