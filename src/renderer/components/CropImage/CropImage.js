/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import Button from '@mui/material/Button';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { IconButton, Slider, Stack } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
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
  const [rotate, setRotate] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleRotate = (_e, value) => {
    setRotate(value);
  };
  const handleZoom = (_e, value) => {
    setZoom(value);
  };

  const handleReset = () => {
    setPreviewImage(null);
    setZoom(1);
    setRotate(0);
  };
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
      canvasPreview(imageRef.current, canvasRef.current, crop, zoom, rotate);
    }
  }, [crop, zoom, rotate, previewImage]);

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
              style={{ transform: `scale(${zoom}) rotate(${rotate}deg)` }}
            />
          </ReactCrop>
        ) : (
          <Button
            sx={{
              color: '#fff',
              border: '1px dashed #fff !important',
              px: 10,
              py: 10,
            }}
            color="success"
            variant="outlined"
            component="label"
          >
            Upload Image
            <input
              hidden
              accept="image/*"
              type="file"
              ref={inputFile}
              onChange={handleFileSelect}
            />
          </Button>
        )}
        <canvas className="canvas1" ref={canvasRef} />
      </div>
      {previewImage && (
        <div className="button-group">
          <Stack spacing={3} direction="row" sx={{ my: 1 }} alignItems="center">
            <IconButton
              onClick={() =>
                setRotate(
                  rotate % 90 === 0 && rotate > -180
                    ? rotate - 90
                    : Math.floor(rotate / 4) * 90
                )
              }
            >
              <CropRotateIcon color="#1e3c72" />
            </IconButton>
            <Slider
              sx={{ width: 90, color: '#1e3c72' }}
              aria-label="Volume"
              value={rotate}
              onChange={handleRotate}
              min={-180}
              max={180}
              step={1}
            />
            <IconButton
              sx={{
                border: '1px solid #1e3c72',
                color: '#1e3c72',
              }}
              variant="contained"
              onClick={handleReset}
            >
              <RestartAltIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundImage:
                  'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)',
                color: '#80D0C7',
                cursor: crop.height ? 'pointer' : 'not-allowed',
              }}
              className="download-btn"
              variant="contained"
              onClick={() => crop.height && downloadImage()}
              title={!crop.height ? 'Select Crop Area First' : ''}
            >
              <SaveIcon />
            </IconButton>
            <Slider
              sx={{ width: 90, color: '#1e3c72' }}
              aria-label="Volume"
              value={zoom}
              onChange={handleZoom}
              min={1}
              max={10}
              step={0.1}
            />
            <IconButton
              onClick={() => setZoom((pre) => (pre < 10 ? pre + 1 : pre))}
            >
              <ZoomInIcon color="#1e3c72" />
            </IconButton>
          </Stack>
        </div>
      )}
    </div>
  );
}
