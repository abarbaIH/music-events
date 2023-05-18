const festivalName = document.querySelector('#eventName').value
const festivalLat = document.querySelector('#eventLat').value
const festivalLon = document.querySelector('#eventLon').value

const festivalCoords = { lat: Number(festivalLat), lng: Number(festivalLon) }

function initMap() {

  const myMap = new google.maps.Map(
    document.querySelector('#map'),
    { zoom: 15, center: festivalCoords}
  )

  new google.maps.Marker({
    map: myMap,
    position: festivalCoords,
    title: festivalName,
  })
}
