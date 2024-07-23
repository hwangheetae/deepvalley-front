import { useRef, useState } from 'react';

const ImageUploadTest = () => {
  const [imgFile, setImgFile] = useState<string>('');
  const upload = useRef<HTMLInputElement | null>(null);

  const imgUpload = () => {
    if (upload.current?.files) {
      const file = upload.current.files[0];
      setImgFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h1>image upload</h1>
      <input
        type="file"
        ref={upload}
        onChange={imgUpload}
        accept="image/*"
        style={{
          zIndex: 2,
          marginBottom: '10px',
          cursor: 'pointer',
        }}
      />
      <h2>이미지 저장소</h2>
      <div style={{ display: 'flex' }}>
        <img
          style={{ width: '200px', height: '200px' }}
          src={imgFile}
          alt="img"
        />
      </div>
    </>
  );
};

export default ImageUploadTest;
