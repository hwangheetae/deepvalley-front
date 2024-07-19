import React from 'react';

const Picture: React.FC = () => {
  return (
    <div>
      <h1>사진</h1>
      <div>
        <img src="image1_url" alt="image1" />
        <img src="image2_url" alt="image2" />
        <img src="image3_url" alt="image3" />
      </div>
    </div>
  );
};

export default Picture;
