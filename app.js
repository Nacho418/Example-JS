checkStorage()

//INSERTAR FECHA
let day = new Date()
let hoy = [day.getDate(), day.getMonth(), day.getFullYear()]
let hoyStr = day.toLocaleDateString()
document.querySelector(".fecha").textContent = hoyStr

//GET LISTA DE PRECIOS DESDE JSON API
let productData
fetch('prods.json').then((resp) => resp.json()).then((data) => {
    let dataEnJson = JSON.stringify(data)
    localStorage.setItem("listaDePrecios", dataEnJson)})

//OBTENGO JSON EN VARIABLE GLOBAL
let listaProd = JSON.parse(localStorage.getItem("listaDePrecios"))

//LISTA DE PRECIOS
let precio1 = listaProd[0].precio
let precio2 = listaProd[1].precio
let precio3 = listaProd[2].precio
let precio4 = listaProd[3].precio
let precio5 = listaProd[4].precio
let precio6 = listaProd[5].precio
//ASIGNAMIENTO DE PRECIOS
document.querySelector("#span1").textContent = precio1
document.querySelector("#span2").textContent = precio2
document.querySelector("#span3").textContent = precio3
document.querySelector("#span4").textContent = precio4
document.querySelector("#span5").textContent = precio5
document.querySelector("#span6").textContent = precio6

//TEXTO PRODUCTOS
document.querySelector("#producto1p").innerHTML = listaProd[0].producto
document.querySelector("#producto2p").innerHTML = listaProd[1].producto
document.querySelector("#producto3p").innerHTML = listaProd[2].producto
document.querySelector("#producto4p").innerHTML = listaProd[3].producto
document.querySelector("#producto5p").innerHTML = listaProd[4].producto
document.querySelector("#producto6p").innerHTML = listaProd[5].producto

//IMAGENES PRODUCTOS
document.querySelector("#producto1i").src = listaProd[0].urlImagen
document.querySelector("#producto2i").src = listaProd[1].urlImagen
document.querySelector("#producto3i").src = listaProd[2].urlImagen
document.querySelector("#producto4i").src = listaProd[3].urlImagen
document.querySelector("#producto5i").src = listaProd[4].urlImagen
document.querySelector("#producto6i").src = listaProd[5].urlImagen

//INICIALIZANDO VARIABLES GLOBALES
let numVenta = 0
let pagoTot = 0
let pagoTotal = 0
let pesoTot = 0
let cantProd = 0
let ventas = [] //ARREGLO CONTENEDOR DE TODAS LAS VENTAS
let clientes = []

//SELECTORES DE INPUTS CANTIDADES
let cant1 = document.querySelector("#cantKgHF")
let cant2 = document.querySelector("#cantKgHG")
let cant3 = document.querySelector("#cantKgHGal")
let cant4 = document.querySelector("#cantKgAI")
let cant5 = document.querySelector("#cantKgAl")
let cant6 = document.querySelector("#cantKgHA")

//BOTONES PRIMARIOS
let boton1 = document.querySelector(".comprar")
boton1.addEventListener("click", checkcant)
let boton2 = document.querySelector(".buscarVenta")

//HTML SEGUNDO PÄSO
let subtotal = document.querySelector("#subtotal")
let newH5 = document.createElement("h5")
subtotal.appendChild(newH5)
newH5.textContent = ""
let formRadio = document.createElement("p")
subtotal.appendChild(formRadio)

//HTML BUSCADOR DE TICKET
let divMa = document.querySelector("#ticketEncontrado")
let h5Ticket = document.createElement("h5")
divMa.appendChild(h5Ticket)

//BOTONES SECUNDARIOS
let boton3 = document.querySelector("#confirmar")
let boton4 = document.querySelector("#cancelar")
boton3.addEventListener("click", confirmar)
boton4.addEventListener("click", cancelar)

//FUNCION BOTON PRIMARIO "INICIAR COMPRA"
//FUNCION VALIDAR CANTIDADES INGRESADAS
function checkcant() {
    let inputs = []
    cantProd = 0
    inputs = document.querySelectorAll(".inputKg")
    let errores = 0
    checkCantProd()
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value < 0 || inputs[i].value == null || inputs[i].value == "") {
            errores++
        }
    }
    if (errores == 0 && cantProd > 0) {
        comprar()
        window.scrollTo(0, 10000)
    }
    else {
        alert("Error en las cantidades \nVuelva a intentar")
    }
}

function comprar() {
    cuotas = 1
    cant1 = document.querySelector("#cantKgHF")
    cant2 = document.querySelector("#cantKgHG")
    cant3 = document.querySelector("#cantKgHGal")
    cant4 = document.querySelector("#cantKgAI")
    cant5 = document.querySelector("#cantKgAl")
    cant6 = document.querySelector("#cantKgHA")
    pagoTot = (cant1.value * precio1) + (cant2.value * precio2) + (cant3.value * precio3) + (cant4.value * precio4) + (cant5.value * precio5) + (cant6.value * precio6)
    pesoTot = parseInt(cant1.value) + parseInt(cant2.value) + parseInt(cant3.value) + parseInt(cant4.value) + parseInt(cant5.value) + parseInt(cant6.value)

    editH5(cantProd, pesoTot, pagoTot)

    document.querySelector("#pie").style.display = "block"
    cant1.setAttribute("disabled", "")
    cant2.setAttribute("disabled", "")
    cant3.setAttribute("disabled", "")
    cant4.setAttribute("disabled", "")
    cant5.setAttribute("disabled", "")
    cant6.setAttribute("disabled", "")
    boton2.setAttribute("disabled", "")
    boton2.setAttribute("style", "opacity:0.7")

    formRadio.innerHTML =
        `
<form>
<span class="radioSpan">1 <input id="1" type="radio" name="cuotas" class="radioInput" value="1" onchange="getValue(this)" checked></span>
<span class="radioSpan">3 <input id="3" type="radio" name="cuotas" class="radioInput" value="3" onchange="getValue(this)"></span>
<span class="radioSpan">6 <input id="6" type="radio" name="cuotas" class="radioInput" value="6" onchange="getValue(this)"></span>
<span class="radioSpan">9 <input id="9" type="radio" name="cuotas" class="radioInput" value="9" onchange="getValue(this)"></span>
<span class="radioSpan">12 <input id="12" type="radio" name="cuotas" class="radioInput" value="12" onchange="getValue(this)"></span>
<span class="radioSpan">18 <input id="18" type="radio" name="cuotas" class="radioInput" value="18" onchange="getValue(this)"></span>
</form>
`
}

function editH5(cant, peso, pago) {
    newH5.innerHTML = `
    Cantidad de items: ${cant}<br><br>
    Peso Total: ${peso} kg<br><br>
    Total a abonar: <strong style="color: red">$${pago}</strong><br><br>
    Cantidad de pagos (5% mensual acumulativo)
    `
}

//FUNCION GET RADIO VALUE
function getValue(e) {
    cuotas = parseInt(e.value)
    pagoTotal = pagoTot
    for (let i = 2; i <= cuotas; i++) {
        pagoTotal *= 1.05
    }
    pagoTotal = Math.floor(pagoTotal)
    editH5(cantProd, pesoTot, pagoTotal)
}

//FUNCION CANCELAR COMPRA
function cancelar() {
    newH5.innerHTML = ""
    document.querySelector("#pie").style.display = "none"
    cant1.removeAttribute("disabled", "")
    cant2.removeAttribute("disabled", "")
    cant3.removeAttribute("disabled", "")
    cant4.removeAttribute("disabled", "")
    cant5.removeAttribute("disabled", "")
    cant6.removeAttribute("disabled", "")
    boton2.removeAttribute("disabled", "")
    boton2.removeAttribute("style", "opacity:0.7")
    Toastify({
        avatar: "https://img1.freepng.es/20180203/cae/kisspng-scalable-vector-graphics-computer-file-cancel-button-png-photos-5a756d294d0b97.9125681215176450973156.jpg",
        text: "¡Cancelado!",
        duration: 4000,
        style: {
            background: "linear-gradient(to right, rgb(255, 0, 0), rgb(255, 136, 0))",
        }
    }).showToast();

}

function checkCantProd() {
    let inputs = document.querySelectorAll(".inputKg")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value > 0) {
            cantProd++
        }
    }
}

//FUNCION CONFRIMAR COMPRA
function confirmar() {
    Swal.fire({
        title: '¿Confirmar compra?',
        text: "No se podrá deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            let vendido = new Venta()
            numVenta++
            vendido.numVenta = numVenta
            vendido.fecha = hoyStr
            vendido.pago = pagoTotal
            vendido.pesoTot = pesoTot
            vendido.cantCuotas = cuotas
            vendido.cantProd = cantProd
            let cliente = JSON.parse(sessionStorage.getItem("client"))
            vendido.cliente = cliente
            ventas.push(vendido)
            let enJson = JSON.stringify(ventas)
            localStorage.setItem("ventas", enJson)
            Swal.fire(
                '¡Realizado!',
                `Gracias ${vendido.cliente.nombre} por su compra`,
                'success'
            )
            Toastify({
                avatar: "https://e7.pngegg.com/pngimages/707/466/png-clipart-check-mark-computer-icons-symbol-check-miscellaneous-angle.png",
                text: "¡Venta realizada con éxito!",
                duration: 4000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            reiniciar()
        }
        else {
            cancelar()
            comprar()
        }
    })
}

//FUNCION RESTABLECER PREDETERMINADO
function reiniciar() {
    cant1.value = 0
    cant2.value = 0
    cant3.value = 0
    cant4.value = 0
    cant5.value = 0
    cant6.value = 0
    newH5.innerHTML = ""
    document.querySelector("#pie").style.display = "none"
    cant1.removeAttribute("disabled", "")
    cant2.removeAttribute("disabled", "")
    cant3.removeAttribute("disabled", "")
    cant4.removeAttribute("disabled", "")
    cant5.removeAttribute("disabled", "")
    cant6.removeAttribute("disabled", "")
    boton2.removeAttribute("disabled", "")
    boton2.removeAttribute("style", "opacity:0.7")
    cantProd = 0
}

function deleteNum() {
    let numero = document.querySelector("#inputBuscador")
    numero.value = null
    divMa.style.display = "none"
}

let botonBuscador = document.querySelector("#botonBuscador")
botonBuscador.addEventListener("click", buscarVenta)

function buscarVenta() {
    let ventaBuscada = parseFloat(document.querySelector("#inputBuscador").value)
    let ventasGuardadas = JSON.parse(localStorage.getItem("ventas"))
    if (ventasGuardadas.some((venta) => venta.numVenta == ventaBuscada)) {
        let buscado = ventasGuardadas.find(venta => venta.numVenta == ventaBuscada)
        mostrarVenta(buscado)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha encontrado su N° de venta',
        })
        deleteNum()
    }
}

function mostrarVenta(obj) {
    h5Ticket.innerHTML =
        `
    <p>
    Ticket N° ${obj.numVenta}<br>
    Fecha ${obj.fecha}<br><br>
    Cliente: <br>${obj.cliente.nombre} ${obj.cliente.apellido}<br>
    ${obj.cliente.correo}<br><br>
    Peso total: ${obj.pesoTot}kg<br>
    Monto total: $${obj.pago}<br><br>
    Se cobró en ${obj.cantCuotas} pagos de $${parseInt(obj.pago / obj.cantCuotas)}
    </p>
    `
    divMa.style.display = "block"
}

//CLASE PARA GENERADOR DE VENTAS
class Venta {
    constructor(numVenta, cantProd, pago, cantCuotas, pesoTot, fecha, cliente) {
        this.numVenta = numVenta;
        this.cantProd = cantProd;
        this.pago = pago;
        this.cantCuotas = cantCuotas;
        this.pesoTot = pesoTot;
        this.fecha = fecha;
        this.cliente = cliente;
    }
}
class Persona {
    constructor(nombre, apellido, correo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
    }
}

function login(event) {
    event.preventDefault()
    let formulario = document.querySelector("#form")
    let nombre = formulario.name.value
    let apellido = formulario.lastName.value
    let correo = formulario.email.value
    let person = new Persona()
    person.nombre = nombre
    person.apellido = apellido
    person.correo = correo
    clientes.push(person)
    personToJson = JSON.stringify(person)
    sessionStorage.setItem("client", personToJson)
    checkData(person)
}

function checkStorage() {
    let cliente = JSON.parse(sessionStorage.getItem("client"))
    if (cliente != null) {
        approved()
    }
}

function checkData(data) {
    if (data.nombre == "" || data.apellido == "" || data.correo == "") {
        sessionStorage.removeItem("client")
        alert("Ingrese todos sus datos")

    }
    location.reload()
}

function approved() {
    divLista = document.querySelector("#lista")
    divLista.classList.remove("hide")
    let formulario = document.querySelector("#form")
    formulario.classList.add("hide")
}