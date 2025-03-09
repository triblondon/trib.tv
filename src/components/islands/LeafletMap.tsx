import { MapContainer, TileLayer } from 'react-leaflet'
import "../../styles/leaflet-1.9.4.css";
import type { LatLngExpression } from 'leaflet';

interface Props {
    center: LatLngExpression,
    zoom: number
}

const FASTLY_HOSTED_DOMAINS = ['www.trib.tv', 'trib.tv', 'xn--cck1dvdta7b3c.xn--tckwe'];
const TILE_HOST = "tiles.stadiamaps.com";

const tileBaseUrl = FASTLY_HOSTED_DOMAINS.includes(location.hostname) ? '' : 'https://' + TILE_HOST;

const LeafletMap = (props: Props) => {
    return (
        <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={false} zoomControl={false} dragging={false}>
            <TileLayer
                url={`${tileBaseUrl}/tiles/stamen_toner/{z}/{x}/{y}{r}.png`}
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
}

export default LeafletMap;