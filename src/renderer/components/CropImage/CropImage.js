/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import canvasPreview from '../CanvasPreview';
import './CropImage.css';

export default function CropImage() {
  const [crop, setCrop] = useState({
    // unit: '%',
    // height: 90,
    // width: 90,
    // aspect: 16 / 9,
  });

  const inputFile = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  React.useEffect(() => {
    if (previewImage) {
      canvasPreview(imageRef.current, canvasRef.current, crop);
    }
  }, [crop, previewImage]);

  function downloadImage() {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'cropped-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="main-container">
      <div>
        {previewImage ? (
          <ReactCrop crop={crop} onChange={(percentage) => setCrop(percentage)}>
            <img
              className="crop-image"
              ref={imageRef}
              src={previewImage}
              alt="test"
            />
          </ReactCrop>
        ) : (
          <input type="file" ref={inputFile} onChange={handleFileSelect} />
        )}
        <canvas className="canvas1" ref={canvasRef} />
      </div>
      {previewImage && (
        <div className="button-group">
          <button type="button" onClick={() => setPreviewImage(null)}>
            Reset
          </button>
          <button
            className="download-btn"
            type="button"
            onClick={downloadImage}
          >
            Crop
          </button>
        </div>
      )}
    </div>
  );
}
