import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  lat: number;
  lng: number;
  userName?: string;
  address?: string;
  zoom?: number;
  showSafeZone?: boolean;
  safeZoneRadius?: number;
  breadcrumbs?: Array<{ lat: number; lng: number; time: string; label: string }>;
  height?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  lat,
  lng,
  userName = 'Eleanor Vance (Elderly)',
  address = '742 Evergreen Terrace',
  zoom = 16,
  showSafeZone = true,
  safeZoneRadius = 150,
  breadcrumbs = [],
  height = '420px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Custom pulse marker icon
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="position: relative; width: 32px; height: 32px;">
          <div style="position: absolute; width: 32px; height: 32px; background: rgba(37, 99, 235, 0.25); border-radius: 50%; animation: pulse 2s infinite;"></div>
          <div style="position: absolute; top: 4px; left: 4px; width: 24px; height: 24px; background: #2563eb; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: zoom,
      zoomControl: true,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marker
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    markerRef.current = marker;

    marker.bindPopup(`
      <div style="font-family: inherit; padding: 4px;">
        <h4 style="font-weight: 700; font-size: 14px; margin: 0 0 4px 0; color: #0f172a;">${userName}</h4>
        <p style="font-size: 12px; margin: 0; color: #475569;">${address}</p>
        <div style="margin-top: 6px; display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 8px; background: #ecfdf5; color: #059669; border-radius: 9999px;">
          Inside Safe Home Zone
        </div>
      </div>
    `);

    // Safe Zone Geofence Circle
    if (showSafeZone) {
      const circle = L.circle([lat, lng], {
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.12,
        radius: safeZoneRadius,
        weight: 2,
        dashArray: '5, 5'
      }).addTo(map);
      circleRef.current = circle;
    }

    // Breadcrumbs polyline if any
    if (breadcrumbs && breadcrumbs.length > 1) {
      const latlngs = breadcrumbs.map((b) => [b.lat, b.lng] as [number, number]);
      L.polyline(latlngs, {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.7,
        dashArray: '6, 6'
      }).addTo(map);

      breadcrumbs.forEach((b, idx) => {
        if (idx !== 0) {
          const breadcrumbIcon = L.divIcon({
            className: 'breadcrumb-marker',
            html: `<div style="width: 10px; height: 10px; background: #60a5fa; border: 2px solid white; border-radius: 50%;"></div>`,
            iconSize: [10, 10],
            iconAnchor: [5, 5]
          });
          L.marker([b.lat, b.lng], { icon: breadcrumbIcon })
            .bindPopup(`<small><b>${b.time}</b>: ${b.label}</small>`)
            .addTo(map);
        }
      });
    }

    // Map resize trigger for crisp rendering
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom, showSafeZone, safeZoneRadius]);

  const recenterMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], zoom, { animate: true });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Overlay Recenter control */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <button
          onClick={recenterMap}
          className="bg-white/95 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl shadow-md border border-slate-200 backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Recenter User</span>
        </button>
      </div>

      {/* Map watermark / disclaimer */}
      <div className="absolute bottom-2 left-2 z-[400] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] text-slate-500 font-medium border border-slate-200/60 pointer-events-none">
        OpenStreetMap • Demo Location Coordinates
      </div>
    </div>
  );
};

export default MapComponent;
