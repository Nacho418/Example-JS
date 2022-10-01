checkStorage()

//INSERTAR FECHA
let day = new Date()
let hoy = [day.getDate(), day.getMonth(), day.getFullYear()]
let hoyStr = day.toLocaleDateString()
document.querySelector(".fecha").textContent = hoyStr
let productosJSON = []

//GET LISTA DE PRECIOS DESDE JSON API
fetch('prods.json').then((resp) => resp.json()).then((data) => {
    data.forEach(producto => {
        productosJSON.push(producto)
        let divProducto = document.createElement("div")
        divProducto.classList.add("col-lg-4")
        divProducto.classList.add("listaChapas")
        divProducto.innerHTML = `
                    
                        <p id="producto${producto.id}p">${producto.producto}</p>
                        <img id="producto${producto.id}i" class="foto" src="${producto.urlImagen}" alt="">
                        <p>$<span id="span${producto.id}">${producto.precio}</span>.- por kilogramo</p>
                        Cantidad: <input type="number" name="cantKg" id="cantKg${producto.id}" class="inputKg" value=0 min="0">kg
                    
        `
        let divPrinc = document.querySelector("#divPrincipal")
        divPrinc.appendChild(divProducto)
    });
})


//INICIALIZANDO VARIABLES GLOBALES
let numVenta = 0
let pagoTot = 0
let pagoTotal = 0
let pesoTot = 0
let cantProd = 0
let ventas = [] //ARREGLO CONTENEDOR DE TODAS LAS VENTAS
let clientes = []


//BOTONES PRIMARIOS
let boton1 = document.querySelector(".comprar")
boton1.addEventListener("click", checkcant)
let boton2 = document.querySelector(".buscarVenta")

//HTML SEGUNDO PASO
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
    cantProd = 0
   let inputs = document.querySelectorAll(".inputKg")
    let errores = 0
    checkCantProd()
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value < 0 || inputs[i].value == null || inputs[i].value == "") {
            errores++
        }
    }
    if (errores == 0 && cantProd > 0) {
        comprar(inputs)
        window.scrollTo(0, 10000)
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que la cantidad de algún producto es incorrecta',
        })
    }
}

function comprar(inputs) {
    cuotas = 1
    pagoTot = 0
    pesoTot = 0
    for (let i = 0; i < inputs.length; i++) {
        pagoTot += parseInt(inputs[i].value)*productosJSON[i].precio
        pesoTot += parseInt(inputs[i].value)
        inputs[i].setAttribute("disabled", "")
    }
    pagoTotal = pagoTot

    editH5(cantProd, pesoTot, pagoTot)

    document.querySelector("#pie").style.display = "block"
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
        }
    })
}
//FUNCION CANCELAR COMPRA
function cancelar() {
    let inputs = document.querySelectorAll(".inputKg")
    newH5.innerHTML = ""
    document.querySelector("#pie").style.display = "none"
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute("disabled", "")
    }
    cantProd = 0
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


//FUNCION RESTABLECER PREDETERMINADO
function reiniciar() {
    let inputs = document.querySelectorAll(".inputKg")
    newH5.innerHTML = ""
    document.querySelector("#pie").style.display = "none"
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = 0
        inputs[i].removeAttribute("disabled", "")
    }
    cantProd = 0
    boton2.removeAttribute("disabled", "")
    boton2.removeAttribute("style", "opacity:0.7")
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