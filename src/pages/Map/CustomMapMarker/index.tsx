import { MapMarker, MapMarkerProps } from 'react-kakao-maps-sdk';
import { useState, ReactNode } from 'react';

const fixedMarkerSize = {
  width: 56,
  height: 56,
};

const fixedMarkerOptions = {
  offset: {
    x: 10,
    y: 10,
  },
};

interface CustomMapMarkerProps {
  position: { lat: number; lng: number };
  label: string;
  icon?: ReactNode;
  src?: string;
  onClick?: () => void;
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  position,
  label,
  // icon,
  src,
  onClick,
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
    ></MapMarker>
  );
};

export default CustomMapMarker;
