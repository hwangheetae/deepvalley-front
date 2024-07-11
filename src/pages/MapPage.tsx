declare global {
  interface Window {
    kakao: any;
  }
}

import { Map, MapMarker } from 'react-kakao-maps-sdk';

export const MapPage = () => {
  return (
    <Map
      center={{ lat: 37.558090961074825, lng: 126.99847210567884 }}
      style={{ width: '500px', height: '500px' }}
    >
      <MapMarker
        position={{ lat: 37.558090961074825, lng: 126.99847210567884 }}
      >
        <div className="bg-white">xx계곡</div>
      </MapMarker>
      <MapMarker
        position={{ lat: 37.568090961074825, lng: 126.99847210567884 }}
      >
        <div className="bg-white ">yy계곡</div>
      </MapMarker>
    </Map>
  );
};

export default MapPage;
