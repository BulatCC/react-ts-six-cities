import { useEffect, useRef } from 'react';
import { Marker, Icon } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offers';

type MainMapProps = {
  offers: Offer[];
  activeCard: number;
}

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

function MainMap({ offers, activeCard }: MainMapProps): JSX.Element {
  const [{ city: { location } }] = offers;
  const mapRef = useRef(null);

  const map = useMap(location, mapRef);

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];
      offers.forEach(({ location, id }) => {
        const marker = new Marker([location.latitude, location.longitude]);
        markers.push(marker);
        marker.setIcon(currentIcon);
        id === activeCard ? marker.setIcon(currentIcon).addTo(map) : marker.setIcon(defaultIcon).addTo(map);
      });

      return () => markers.forEach((marker) => map.removeLayer(marker));
    }
  }, [map, activeCard, offers]);

  return (
    <section className="cities__map map" style={{
      height: '100%',
    }} ref={mapRef}
    >
    </section>
  );
}

export default MainMap;
