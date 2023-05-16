

    document.querySelector('#artist1').onkeyup = event => {

        const { value } = event.target

        // 1 - enviamos a la api 
        console.log('VAMOS A MANDAR A LA API EL TITULO', value, 'Y A RENDERIZAR LOS POSIBLES ARTISTAS EN LA UL')

       fetch(`/api/getArtists/${value}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('Error:', error))


        // 2 - renderizamos sugerencias en la ul:
        document.querySelector('#artist1results').innerHTML += `<li>NOMBRE 1 DEL ARTISTA</li> <li>NOMBRE 2 DEL ARTISTA</li>`

    }