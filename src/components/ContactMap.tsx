import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
  address: string;
  lat: number | null;
  lng: number | null;
  linkUrl: string;
};

export function ContactMap({ address, lat, lng, linkUrl }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
      <div className="relative aspect-[16/10] w-full bg-surface">
        {mounted ? (
          <MapContainer
            center={[lat, lng]}
            zoom={16}
            scrollWheelZoom={false}
            className="absolute inset-0 z-0 size-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} />
          </MapContainer>
        ) : (
          <div className="text-muted-fg absolute inset-0 flex items-center justify-center text-sm">Loading map…</div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-background px-4 py-3 sm:px-5">
        {address ? <p className="text-[14px] font-medium text-foreground">{address}</p> : <span />}
        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy hover:underline"
          >
            Open in Maps <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
