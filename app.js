let precio1 = 956
let precio2 = 841
let precio3 = 1248
let precio4 = 5128
let precio5 = 3592
let precio6 = 928

let day = new Date()
let hoy = [day.getDate(), day.getMonth(), day.getFullYear()]
let hoyStr = day.toDateString()
document.querySelector(".fecha").textContent = hoyStr
let numVenta = 0
let pagoTot = 0
let pesoTot = 0
let ventas = []

let cant1 = document.querySelector("#cantKgHF")
let cant2 = document.querySelector("#cantKgHG")
let cant3 = document.querySelector("#cantKgHGal")
let cant4 = document.querySelector("#cantKgAI")
let cant5 = document.querySelector("#cantKgAl")
let cant6 = document.querySelector("#cantKgHA")

document.querySelector("#span1").textContent = precio1
document.querySelector("#span2").textContent = precio2
document.querySelector("#span3").textContent = precio3
document.querySelector("#span4").textContent = precio4
document.querySelector("#span5").textContent = precio5
document.querySelector("#span6").textContent = precio6


function checkcant() {
    let inputs = []
    inputs = document.querySelectorAll(".inputKg")
    let errores = 0
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value < 0 || inputs[i].value == null || inputs[i].value == "") {
            errores++
        }
    }
    if (errores == 0) {
        comprar()
    }
    else {
        alert("Error en las cantidades \n Vuelva a intentar")
    }
}
function comprar() {
    cant1 = document.querySelector("#cantKgHF")
    cant2 = document.querySelector("#cantKgHG")
    cant3 = document.querySelector("#cantKgHGal")
    cant4 = document.querySelector("#cantKgAI")
    cant5 = document.querySelector("#cantKgAl")
    cant6 = document.querySelector("#cantKgHA")
    numVenta++
    pagoTot = (cant1.value * precio1) + (cant2.value * precio2) + (cant3.value * precio3) + (cant4.value * precio4) + (cant5.value * precio5) + (cant6.value * precio6)
    pesoTot = parseInt(cant1.value) + parseInt(cant2.value) + parseInt(cant3.value) + parseInt(cant4.value) + parseInt(cant5.value) + parseInt(cant6.value)

    newH5.innerHTML = `
    Cantidad de items: <br><br>
    Peso Total: ${pesoTot} kg<br><br>
    Total a abonar: $${pagoTot}<br><br>
    Cantidad de pagos:
    <p>
    <form>
    <span class="radioSpan">1<input type="radio" name="cuotas" class="radioInput" value="1" checked></span>
    <span class="radioSpan">3<input type="radio" name="cuotas" class="radioInput" value="3"></span>
    <span class="radioSpan">6<input type="radio" name="cuotas" class="radioInput" value="6"></span>
    <span class="radioSpan">9<input type="radio" name="cuotas" class="radioInput" value="9"></span>
    <span class="radioSpan">12<input type="radio" name="cuotas" class="radioInput" value="12"></span>
    </form>
    <br>
    (5% mensual acumulativo)
    </p>
    `
    document.querySelector("#pie").style.display = "block"
    cant1.setAttribute("disabled", "")
    cant2.setAttribute("disabled", "")
    cant3.setAttribute("disabled", "")
    cant4.setAttribute("disabled", "")
    cant5.setAttribute("disabled", "")
    cant6.setAttribute("disabled", "")
}

function verVenta() {
    let numVen = parseInt(prompt("Ingrese número de venta"))
    if (ventas.some((venta) => venta.numVenta == numVen)) {
        let buscado = ventas.find(venta => venta.numVenta == numVen)
        console.log(buscado)
    } else {
        alert("Ticket no encontrado, intente nuevamente")
    }
}
class Venta {
    constructor(numVenta, cantProd, pago, cantCuotas, pesoTot, fecha) {
        this.numVenta = numVenta;
        this.cantProd = cantProd;
        this.pago = pago;
        this.cantCuotas = cantCuotas;
        this.pesoTot = pesoTot;
        this.fecha = fecha;
    }
}
let boton1 = document.querySelector(".comprar")
boton1.addEventListener("click", checkcant)
let boton2 = document.querySelector(".buscarVenta")
boton2.addEventListener("click", verVenta)

let subtotal = document.querySelector("#subtotal")
let newH5 = document.createElement("h5")
subtotal.appendChild(newH5)
newH5.textContent = ""

let boton3 = document.querySelector("#confirmar")
let boton4 = document.querySelector("#cancelar")
boton3.addEventListener("click", confirmar)
boton4.addEventListener("click", cancelar)

function cancelar() {
    newH5.innerHTML = ""
    document.querySelector("#pie").style.display = "none"
    cant1.removeAttribute("disabled", "")
    cant2.removeAttribute("disabled", "")
    cant3.removeAttribute("disabled", "")
    cant4.removeAttribute("disabled", "")
    cant5.removeAttribute("disabled", "")
    cant6.removeAttribute("disabled", "")
}
function confirmar() {
  
    let vendido = new Venta()
    vendido.pago = pagoTotal
    vendido.numVenta = numVenta
    vendido.fecha = day
    vendido.pago = Math.floor(pagoTotal)
    vendido.pesoTot = pesoTot
    vendido.cantCuotas = cuotas
    ventas.push(vendido)
    alert("Gracias por su compra")
    reiniciar()
}
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
}
let radioInputs = document.querySelectorAll(".radioInput")
for (let i = 0; i < radioInputs.length; i++) {
    radioInputs[i].addEventListener("click",modValue) 
}


