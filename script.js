
let map = L.map('map').setView([40.748568447886726, -73.9840279834674], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);





const states = axios('uslgbtq.geojson').then(resp => {
    console.log(resp.data);
    L.geoJSON(resp.data, {
        style: { color: "rgb(200, 80, 80)"},
        onEachFeature: function(feature, layer){

        

            layer.on({
                click: function(e){
                    const name = e.target.feature.properties.STATE_NAME;
                    const dataDiv = document.getElementById('clicked-data');

                    console.log(name);

                    const bills = e.target.feature.properties.bills;
                    const phoneNum = e.target.feature.properties.phone;


                    dataDiv.innerHTML = '';

                    let text = `<h1> ${name}</h1>`;

                    let contact =  ` <p id="num4Change"><a href="tel:${phoneNum}">Call ${phoneNum} to help!</a></p>`

                    bills.forEach(bill=>{
                        text += `
                                    <h3><a href=${bill.link} target="_blank">${bill.name}</a> :</h3> 
                                    <p>${bill.description}</p>
                                    `;

                                    
                    })

                    text += contact;

                    dataDiv.innerHTML += text;

                    
                }
            })
        }
    }).addTo(map);
});

function style(feature) {
    return {
        // fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(states, {style: style}).addTo(map);

