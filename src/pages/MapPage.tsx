import { Map, MapMarker, MapMarkerProps } from 'react-kakao-maps-sdk';
import { useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const commonMarkerImage: MapMarkerProps['image'] = {
  src: 'valleyicon.png',
  size: {
    width: 34,
    height: 39,
  },
  options: {
    offset: {
      x: 27,
      y: 69,
    },
  },
};

interface CustomMapMarkerProps {
  position: { lat: number; lng: number };
  label: string;
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  position,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MapMarker
      position={position}
      image={commonMarkerImage}
      clickable={true}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen && (
        <div className="relative min-w-[150px] bg-white p-2 rounded shadow-lg">
          <img
            alt="close"
            width="14"
            height="13"
            src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <div className="text-black">{label}</div>
        </div>
      )}
    </MapMarker>
  );
};

export const MapPage = () => {
  return (
    <Map
      center={{ lat: 37.558090961074825, lng: 126.99847210567884 }}
      style={{ width: '500px', height: '500px' }}
    >
      <CustomMapMarker
        position={{ lat: 37.558090961074825, lng: 126.99847210567884 }}
        label="xx계곡"
      />
      <CustomMapMarker
        position={{ lat: 37.568090961074825, lng: 126.99847210567884 }}
        label="yy계곡"
      />
    </Map>
  );
};

export default MapPage;
