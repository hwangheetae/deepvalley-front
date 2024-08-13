import {
  MapMarker,
  MapMarkerProps,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { Icon } from '@chakra-ui/icons';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useState, ReactNode } from 'react';

const fixedMarkerSize = {
  width: 56,
  height: 56,
};

const fixedMarkerOptions = {
  offset: {
    x: 28,
    y: 28,
  },
};

interface CustomMapMarkerProps {
  position: { lat: number; lng: number };
  label?: string;
  icon?: ReactNode;
  src?: string;
  onClick?: () => void;
  showLabel?: boolean;
  place?: { place_name: string; y: string; x: string };
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  position,
  label,
  src,
  onClick,
  showLabel = false,
  place,
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
    <>
      <MapMarker
        position={position}
        image={markerImage}
        clickable={true}
        onClick={handleClick}
      />
      {isOpen && showLabel && (
        <CustomOverlayMap position={position} xAnchor={0.5} yAnchor={1.2}>
          <div
            onClick={handleClick}
            style={{
              background: 'white',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {label}{' '}
            <button
              onClick={() =>
                window.open(
                  `https://map.kakao.com/link/to/${place?.place_name},${place?.y},${place?.x}`,
                )
              }
            >
              <Icon as={ExternalLinkIcon} />{' '}
            </button>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default CustomMapMarker;
