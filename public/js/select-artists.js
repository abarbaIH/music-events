

    document.querySelector('#artist1').onkeyup = event => {

        const { value } = event.target

        // 1 - enviamos a la api 
        console.log('VAMOS A MANDAR A LA API EL TITULO', value, 'Y A RENDERIZAR LOS POSIBLES ARTISTAS EN LA UL')

        document.querySelector('#artist1results').innerHTML = ''
        fetch(`/api/getArtists/${value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(artist => {
                document.querySelector('#artist1results').innerHTML += `<li> ${artist.name} </li>`
                document.querySelector('#artist1results').innerHTML += `<a href="/artists/${artist.id}"> ${artist.name} </a>`
                document.querySelector('#artist1results').innerHTML += `<option value="/artists/${artist.id}"> ${artist.name} </option>`
            });
        })
        .catch(error => console.log('Error:', error))


        // 2 - renderizamos sugerencias en la ul:
        // document.querySelector('#artist1results').innerHTML += `<li>NOMBRE 1 DEL ARTISTA</li> <li>NOMBRE 2 DEL ARTISTA</li>`

    }