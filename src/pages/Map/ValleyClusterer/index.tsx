// import { useEffect } from 'react';
// import { useMap } from 'react-kakao-maps-sdk';

// interface ValleyClustererProps {
//   markers: { lat: number; lng: number }[];
// }

// const ValleyClusterer: React.FC<ValleyClustererProps> = ({ markers }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     const clusterer = new kakao.maps.MarkerClusterer({
//       map,
//       averageCenter: true,
//       minLevel: 10,
//       disableClickZoom: true,
//     });

//     const markerObjects = markers.map(
//       (marker) =>
//         new kakao.maps.Marker({
//           position: new kakao.maps.LatLng(marker.lat, marker.lng),
//         }),
//     );

//     clusterer.addMarkers(markerObjects);

//     kakao.maps.event.addListener(
//       clusterer,
//       'clusterclick',
//       (cluster: { getCenter: () => any }) => {
//         const level = map.getLevel() - 1;
//         map.setLevel(level, { anchor: cluster.getCenter() });
//       },
//     );

//     return () => {
//       clusterer.clear();
//     };
//   }, [map, markers]);

//   return null;
// };

// export default ValleyClusterer;
