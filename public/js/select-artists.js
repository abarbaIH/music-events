
// ARTIST #1
document.querySelector('#artist1').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#artist1results').innerHTML = ''
    fetch(`/api/getArtists/${value}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#artist1results').innerHTML = ''
        data.forEach(artist => {
            document.querySelector('#artist1results').innerHTML += `<option value="${artist.name}"></option>`
        })
        })
    .catch(error => console.log('Error:', error))
}


// ARTIST #2
document.querySelector('#artist2').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#artist2results').innerHTML = ''
    fetch(`/api/getArtists/${value}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#artist2results').innerHTML = ''
        data.forEach(artist => document.querySelector('#artist2results').innerHTML += `<option value="${artist.name}"></option>`)})
    .catch(error => console.log('Error:', error))
}


// ARTIST #3
document.querySelector('#artist3').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#artist3results').innerHTML = ''
    fetch(`/api/getArtists/${value}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#artist3results').innerHTML = ''
        data.forEach(artist => document.querySelector('#artist3results').innerHTML += `<option value="${artist.name}"></option>`)})
    .catch(error => console.log('Error:', error))
}


// ARTIST #4
document.querySelector('#artist4').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#artist4results').innerHTML = ''
    fetch(`/api/getArtists/${value}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#artist4results').innerHTML = ''
        data.forEach(artist => document.querySelector('#artist4results').innerHTML += `<option value="${artist.name}"></option>`)})
    .catch(error => console.log('Error:', error))
}


// ARTIST #5
document.querySelector('#artist5').onkeyup = event => {

    const { value } = event.target

    document.querySelector('#artist5results').innerHTML = ''
    fetch(`/api/getArtists/${value}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#artist5results').innerHTML = ''
        data.forEach(artist => document.querySelector('#artist5results').innerHTML += `<option value="${artist.name}"></option>`)})
    .catch(error => console.log('Error:', error))
}