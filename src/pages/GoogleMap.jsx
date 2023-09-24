import googleMapReact from 'google-map-react';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

const Marker = ({ text }) => <div className='logo'>{text}</div>;



export function GoogleMap() {
    const [currLocation, setLocation] = useState({ center: null, zoom: null })

    console.log(currLocation)

    const defaultProps = {
        center: {
            lat: 32.08824718561407,
            lng: 34.773570683968735
        },
        zoom: 11
    };

    function goToStore(lat, lng) {
        setLocation({ center: { lat, lng }, zoom: 15 })
    }

    return (
        // Important! Always set the container height explicitly
        <>
            <button onClick={() => { goToStore(32.08824718561407, 34.773570683968735) }}>
                TLV - Israel
            </button>
            <button onClick={() => { goToStore(35.18981167874425, 25.718217726175347) }}>
                Crete - Greece
            </button>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    center={currLocation.center}
                    zoom={currLocation.zoom}
                >
                    <Marker
                        lat={32.08824718561407}
                        lng={34.773570683968735}
                        text="Toyz-N-Us🧸"
                    />

                    <Marker
                        lat={35.18981167874425}
                        lng={25.718217726175347}
                        text="Toyz-N-Us🧸"
                    />
                </GoogleMapReact>
            </div>
        </>

    );
}