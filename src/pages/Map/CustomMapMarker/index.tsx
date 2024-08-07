import { MapMarker, MapMarkerProps } from 'react-kakao-maps-sdk';
import { useState, ReactNode } from 'react';

const fixedMarkerSize = {
  width: 56,
  height: 56,
};

const fixedMarkerOptions = {
  offset: {
    x: 25,
    y: 15,
  },
};

interface CustomMapMarkerProps {
  position: { lat: number; lng: number };
  label: string;
  icon?: ReactNode;
  src?: string;
  onClick?: () => void;
  showLabel?: boolean;
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  position,
  label,
  src,
  onClick,
  showLabel = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const markerImage: MapMarkerProps['image'] | undefined = src
    ? {
        src,
        size: fixedMarkerSize,
        options: fixedMarkerOptions,
      }
    : undefined;

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) {
      onClick();
    }
  };

  return (
    <MapMarker
      position={position}
      image={markerImage}
      clickable={true}
      onClick={handleClick}
    >
      {isOpen && showLabel && (
        <div
          style={{
            background: 'white',
            padding: '5px',
            borderRadius: '5px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
    </MapMarker>
  );
};

export default CustomMapMarker;
