export const polygon = api => data => map => {
  const { points } = data;
  const polygonObject = new api.Polygon({
    paths: points,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  polygonObject.setMap(map);
  return () => polygonObject.setMap(null);
};

export const circle = api => data => map => {
  const { points } = data;
  const polygonObject = new api.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    center: points[points.length - 1],
    radius: 200000
  });
  polygonObject.setMap(map);
  return () => polygonObject.setMap(null);
};

export const rect = api => data => map => {
  const { points } = data;
  if (points.length > 1) {
    const polygonObject = new api.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      bounds: {
        north: points[points.length - 2].lat,
        south: points[points.length - 1].lat,
        east: points[points.length - 1].lng,
        west: points[points.length - 2].lng
      }
    });
    polygonObject.setMap(map);
    return () => polygonObject.setMap(null);
  } else {
    return () => {};
  }
};
