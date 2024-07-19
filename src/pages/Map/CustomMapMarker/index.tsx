import { MapMarker, MapMarkerProps } from 'react-kakao-maps-sdk';
import { useState, ReactNode } from 'react';

const fixedMarkerSize = {
  width: 30,
  height: 39,
};

const fixedMarkerOptions = {
  offset: {
    x: 1,
    y: 1,
  },
};

interface CustomMapMarkerProps {
  position: { lat: number; lng: number };
  label: string;
  icon?: ReactNode;
  src?: string;
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  position,
  label,
  icon,
  src,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const markerImage: MapMarkerProps['image'] | undefined = src
    ? {
        src,
        size: fixedMarkerSize,
        options: fixedMarkerOptions,
      }
    : undefined;

  return (
    <MapMarker
      position={position}
      image={markerImage}
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

export default CustomMapMarker;
