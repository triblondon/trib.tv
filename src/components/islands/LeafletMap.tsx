import { MapContainer, TileLayer } from 'react-leaflet'
import "../../styles/leaflet-1.9.4.css";

const LeafletMap = (props) => {
    return (
        <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={false} zoomControl={false} dragging={false}>
            <TileLayer
                url="/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
}

export default LeafletMap;