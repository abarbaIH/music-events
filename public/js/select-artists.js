

document.querySelector('#artist1').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#artist1results').innerHTML = ''
    fetch(`/api/getArtists/${value}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        document.querySelector('#artist1results').innerHTML = ''
        data.forEach(artist => {
            // document.querySelector('#artist1results').innerHTML += `<li> ${artist.name} </li>`
            // document.querySelector('#artist1results').innerHTML += `<a href="/artists/${artist.id}"> ${artist.name} </a>`
            // document.querySelector('#artist1results').innerHTML += `<option value="/artists/${artist.id}"> ${artist.name} </option>`
            document.querySelector('#artist1results').innerHTML += `<option value="${artist.id}"> ${artist.name} </option>`
        });
    })
    .catch(error => console.log('Error:', error))

}

document.querySelector('#artist2').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#artist2results').innerHTML = ''
    fetch(`/api/getArtists/${value}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        document.querySelector('#artist2results').innerHTML = ''
        data.forEach(artist => {
            // document.querySelector('#artist1results').innerHTML += `<li> ${artist.name} </li>`
            // document.querySelector('#artist1results').innerHTML += `<a href="/artists/${artist.id}"> ${artist.name} </a>`
            // document.querySelector('#artist1results').innerHTML += `<option value="/artists/${artist.id}"> ${artist.name} </option>`
            document.querySelector('#artist2results').innerHTML += `<option value="${artist.id}"> ${artist.name} </option>`
        });
    })
    .catch(error => console.log('Error:', error))

}