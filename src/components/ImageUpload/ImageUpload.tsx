import React, { useState, useRef } from 'react';

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
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setError('You can only upload image files!');
      return false;
    }

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be smaller than 2MB!');
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
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setImageList([...imageList, data.url]);
      onUploadComplete(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Preview Area */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {imageList.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={url}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
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
                ? 'bg-gray-100 border-gray-300' 
                : 'border-[#FF66C4] hover:bg-pink-50'
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
