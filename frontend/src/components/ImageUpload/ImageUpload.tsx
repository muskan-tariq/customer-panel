import React, { useState, useRef } from 'react';
import { convertImageToBase64 } from '../../utils/imageUtils';

interface ImageUploadProps {
  onUploadComplete: (imageUrl: string) => void;
  maxImages?: number;
  initialImages?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
  maxImages = 1,
  initialImages = []
}) => {
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState<string[]>(initialImages);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('image/')) {
      setError('You can only upload image files!');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB!');
      return false;
    }

    setError('');
    return true;
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    setLoading(true);
    setError('');

    try {
      const base64Image = await convertImageToBase64(file);
      setImageList(prev => [...prev, base64Image]);
      onUploadComplete(base64Image);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageList(prevList => prevList.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Preview Area */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {imageList.map((url, index) => (
          <div key={index} className="relative aspect-square group">
            <img
              src={url}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      {imageList.length < maxImages && (
        <div className="w-full">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className={`w-full px-4 py-2 border-2 border-dashed rounded-lg 
              ${loading 
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
                : 'border-[#FF66C4] hover:bg-pink-50 cursor-pointer'
              } transition-colors duration-200`}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload; 