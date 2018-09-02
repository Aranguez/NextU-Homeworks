//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()
getOptions()


const ciudades = []
const tipos = []
const precios = []

function getOptions(){//las opciones se repiten
  $.getJSON("data.json", function (data) {

    //pusheo a los array toda la data
    data.map(item => {
      ciudades.push(item.Ciudad);
      tipos.push(item.Tipo)
      precios.push(item.Precio)
    })

    //filtro los items repetidos de cada array
    const uniqueCiudades = ciudades.filter( (item, pos)  => ciudades.indexOf(item) == pos)
    const uniqueTipos =    tipos.filter((item, pos)      => tipos.indexOf(item) == pos)

    //Agrego los options
    uniqueCiudades.map( item =>  $('#ciudad').append(`<option value="${item}">${item}</option>`) )
    uniqueTipos   .map( item =>  $('#tipo')  .append(`<option value="${item}">${item}</option>`) )

  });
}

//btn VER TODOS
$('#buscar').on('click', ()=>{
  const selectCiudad = $('#ciudad').find(":selected").text();
  const selectTipo = $('#tipo').find(":selected").text();
  const priceFrom = parseFloat($('.irs-from').text().replace(/\$/g, '').replace(/\,/g, '.'))
  const priceTo = parseFloat($('.irs-to').text().replace(/\$/g, '').replace(/\,/g, '.'))

  if(selectCiudad === 'Escoge una ciudad' && selectTipo === 'Escoge un tipo'){
    buscarPorPrecio(priceFrom, priceTo)
  }

  if(selectCiudad !== 'Escoge una ciudad' && selectTipo === 'Escoge un tipo'){ //si hay seleccionado ciudad
    busquedaCiudad(selectCiudad, priceFrom, priceTo)
  }

  if(selectTipo !== 'Escoge un tipo' && selectCiudad === 'Escoge una ciudad'){ //si hay seleccionado tipo
    busquedaTipo(selectTipo, priceFrom, priceTo)
  }

  if(selectCiudad !== 'Escoge una ciudad' && selectTipo !== 'Escoge un tipo'){ //si hay seleccionado tipo y ciudad
    buscarTodoPorPrecio(selectCiudad, selectTipo, priceFrom, priceTo)
  }

  if($('#personalizada').hasClass('invisible')){
    getAll()
  }
})

//BUSQUEDAS
function buscarPorPrecio(priceFrom, priceTo){ // listo

  $.getJSON("data.json", function (data) {
    $('.lista').html('')
    data.map((item) => {
      if(parseFloat(item.Precio.replace(/\$/g, '')) >= priceFrom && parseFloat(item.Precio.replace(/\$/g, '')) <= priceTo){
        render(item)
      } else{
        return
      }
    })
  });
}

function buscarTodoPorPrecio(ciudad, tipo, priceFrom, priceTo){
  $.getJSON("data.json", function (data) {
    $('.lista').html('')
    data.map((item) => {
      if(parseFloat(item.Precio.replace(/\$/g, '')) >= priceFrom
      && parseFloat(item.Precio.replace(/\$/g, '')) <= priceTo
      && item.Ciudad == ciudad
      && item.Tipo == tipo){
        render(item)
      }
    })
  });
}

function busquedaCiudad(val, priceFrom, priceTo){ //LISTO

  ciudades.filter(item => {
    if(item === val){
      $('.lista').html('')
      $.getJSON("data.json", function (data) {
        data.map((item, index) => {
          if(parseFloat(item.Precio.replace(/\$/g, '')) >= priceFrom
          && parseFloat(item.Precio.replace(/\$/g, '')) <= priceTo
          && item.Ciudad == val){
            render(item)
          }
        })
      });
    } else{
      return
    }
  });
}

function busquedaTipo(val, priceFrom, priceTo){ //LISTO

  tipos.filter(item => {
    if(item === val){
      $('.lista').html('')
      $.getJSON("data.json", function (data) {
        data.map((item, index) => {
          if(parseFloat(item.Precio.replace(/\$/g, '')) >= priceFrom
          && parseFloat(item.Precio.replace(/\$/g, '')) <= priceTo
          && item.Tipo == val){
            render(item)
          }
        })
      });
    } else{
      return
    }
  });
}

function getAll(){
  $.getJSON("data.json", function (data) {
    data.map((item, index) => {
      render(item)
    })
  });
}

function render(item){
  const card = `
        <div class="card horizontal">
          <div class="card-image">
            <img src="images/home.jpg">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div>
                <b>Direccion: ${item.Direccion}</b><p></p>
              </div>
              <div>
                <b>Ciudad: ${item.Ciudad}</b><p></p>
              </div>
              <div>
                <b>Telefono: ${item.Telefono}</b><p></p>
              </div>
              <div>
                <b>Código postal: ${item.Codigo_Postal}</b><p></p>
              </div>
              <div>
                <b>Precio: ${item.Precio}</b><p></p>
              </div>
              <div>
                <b>Tipo: ${item.Tipo}</b><p></p>
              </div>
            </div>
            <div class="card-action right-align">
              <a href="#">Ver más</a>
            </div>
          </div>
        </div>`;

        $('.lista').append(card)
}
