import { getData } from './data.js';


async function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGViYW5qYW45OTkiLCJhIjoiY2trazYxbDN4MjV6dzJ3cXVjd2pqbDA2OSJ9.0NRFDuRWrCFbWiN2Rg35NQ';

    const data = await getData();

    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
        zoom: 2,
        center: [16, 27]
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.once("load", function() {
        data.map(marker => {
            const el = stylingMarker(marker);
            new mapboxgl.Marker(el)
                .setLngLat([marker.countryInfo.long, marker.countryInfo.lat])
                .addTo(map);
        })

        const markers = Array.from(document.querySelectorAll('.marker'));
        markers.forEach(marker => {
            marker.addEventListener('click', () => {
                const popup = marker.childNodes[0];
                popup.style.visibility = 'visible';
                markerVisibility('hidden');

                setTimeout(function() {
                    popup.style.visibility = "hidden";
                    markerVisibility('visible');

                }, 2500);
            });
        })


    })

    function stylingMarker(marker) {
        let el = document.createElement('div');
        el.className = 'marker';
        if (marker.todayCases > 100000) {
            el.style.width = '100px';
            el.style.height = '100px';
            el.style.backgroundColor = '#660000';
            el.style.opacity = 0.7;
        } else if (marker.todayCases > 50000 && marker.todayCases < 100000) {
            el.style.width = '75px';
            el.style.height = '75px';
            el.style.backgroundColor = '#BF3C5A';
        } else if (marker.todayCases > 10000 && marker.todayCases < 50000) {
            el.style.width = '50px';
            el.style.height = '50px';
            el.style.backgroundColor = '#E86156';
        } else if (marker.todayCases > 1000 && marker.todayCases < 10000) {
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.backgroundColor = '#F19D67';
        } else {
            el.style.width = '10px';
            el.style.height = '10px';
            el.style.backgroundColor = '#F0E4A3';
        }
        let popupel = document.createElement('div');
        popupel.className = 'popup';
        popupel.innerHTML = `<p>Country: <b>${marker.country}</b></p><hr>
        <p>Cases Today: <b>${marker.todayCases}</b></p><hr>
        <p>Deaths Today: <b>${marker.todayDeaths}</b></p><hr>
        <p>Recovered Today: <b>${marker.todayRecovered}</b></p>`
        el.appendChild(popupel);
        return el;
    }
}

function markerVisibility(status) {
    const innermarkers = Array.from(document.querySelectorAll('.marker')).forEach(
        inmk =>
        inmk.style.visibility = status
    );
}






initMap();