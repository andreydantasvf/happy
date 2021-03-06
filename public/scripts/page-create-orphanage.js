// pegando a localização atual do usuario
function getPosition(position, latAtual, lngAtual) {
    latAtual = position.coords.latitude;
    lngAtual = position.coords.longitude;

// create map
const map = L.map("mapid").setView([latAtual, lngAtual], 16);

// create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create ico
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

    let marker

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat
    const lng = event.latlng.lng

    document.querySelector('[name=lat').value = lat
    document.querySelector('[name=lng').value = lng

    // remove icon
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

}  

navigator.geolocation.getCurrentPosition(getPosition);


// adicionar o campo de fotos
function addPhotoField() {
    // pegar o container de fotos #images
    const container = document.querySelector('#images')
    // pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    // realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    // verificar se o campo está vazio, se sim, nãoa dicionar ao container 
    const input = newFieldContainer.children[0]

    if(input.value == "") {
        return
    }
    // limpar o campo antes de adicionar ao container
    input.value = ""
    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}

// deleter um campo de fotos
function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length < 2) {
        // limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // deletar o campo
    span.parentNode.remove()
}

// select yes or no
function toggleSelect(event) {
    //retirar a classe .active dos botoes
    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active') )

    //adionar a classe .active ao botao
    const button = event.currentTarget
    button.classList.add('active')

    //atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')

    input.value = button.dataset.value
}

//validar se foi selecionado algum ponto no mapa
function validate(event) {
    const inputLat = document.querySelector('[name="lat"]')
    
    if(inputLat.value == "") {
        event.preventDefault()
        alert('Selecione um ponto no mapa!')
    }
}