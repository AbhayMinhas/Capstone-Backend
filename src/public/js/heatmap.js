let heatLayer = null;

const severityWeight = {
  theft: 0.5,
  accident: 1.0, //highest
  harassment: 0.8, //medium-high
  other: 0.4,
};

export function renderHeatmap(map, incidents, isVisible) {
  if (heatLayer) {
    map.removeLayer(heatLayer);
  }
  console.log("heatmap incidents:", incidents);
  const points = incidents.map((i) => {
    const [lng, lat] = i.coordinates;

    const weight = severityWeight[i.type] || 0.5;

    return [lat, lng, weight];
  });

  heatLayer = L.heatLayer(points, {
    radius: 40,
    blur: 20, // less blur = sharper, more visible blobs
    maxZoom: 17,
    minOpacity: 0.7, // higher = always visible
    gradient: {
      0.0: "transparent",
      0.3: "#ffff00", // bright yellow
      0.5: "#ff8800", // vivid orange
      0.7: "#ff2200", // hot red
      0.9: "#cc0000", // deep red
      1.0: "#7f0000", // dark blood red (hotspot core)
    },
  });

  if (isVisible) {
    heatLayer.addTo(map);
  }
}

export function toggleHeatmap(map, clusterGroup, state) {
  const { isHeatmapVisible } = state;

  if (isHeatmapVisible) {
    map.removeLayer(clusterGroup);
    if (heatLayer) heatLayer.addTo(map);
  } else {
    map.addLayer(clusterGroup);
    if (heatLayer) map.removeLayer(heatLayer);
  }
}
