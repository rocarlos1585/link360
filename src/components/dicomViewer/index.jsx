import React, { useState } from 'react';
import dicomParser from 'dicom-parser';
import ImageGallery from 'react-image-gallery';

const DicomViewer = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = async (e) => {
    const dicomFile = e.target.files[0];
    const arrayBuffer = await dicomFile.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);
    const dataSet = dicomParser.parseDicom(byteArray);

    const pixelData = dataSet.elements.x7fe00010;
    const pixelArray = new Uint8Array(dataSet.byteArray.buffer, pixelData.dataOffset, pixelData.length);
    const base64Data = btoa(String.fromCharCode.apply(null, pixelArray));
    const imageDataUrl = 'data:image/png;base64,' + base64Data;

    setImages([{ original: imageDataUrl, thumbnail: imageDataUrl }]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {images.length > 0 && <ImageGallery items={images} />}
    </div>
  );
};

export default DicomViewer;
