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
    center: points[0],
    radius: 20000
  });
  polygonObject.setMap(map);
  return () => polygonObject.setMap(null);
};
