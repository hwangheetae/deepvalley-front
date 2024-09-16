export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const image = new window.Image();
      image.src = event.target?.result as string;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = image;
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (maxHeight / height) * width;
          height = maxHeight;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: blob.type,
              });
              resolve(optimizedFile);
            }
          },
          'image/webp',
          0.8,
        );
      };
      image.onerror = () => reject(new Error('Failed to load image'));
    };
  });
};
