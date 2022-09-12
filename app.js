//INSERTAR FECHA
let day = new Date()
let hoy = [day.getDate(), day.getMonth(), day.getFullYear()]
let hoyStr = day.toLocaleDateString()
document.querySelector(".fecha").textContent = hoyStr

//LISTA DE PRECIOS
let precio1 = 956
let precio2 = 841
let precio3 = 1248
let precio4 = 5128
let precio5 = 3592
let precio6 = 928

//ASIGNAMIENTO DE PRECIOS
document.querySelector("#span1").textContent = precio1
document.querySelector("#span2").textContent = precio2
document.querySelector("#span3").textContent = precio3
document.querySelector("#span4").textContent = precio4
document.querySelector("#span5").textContent = precio5
document.querySelector("#span6").textContent = precio6

//INICIALIZANDO VARIABLES GLOBALES
let numVenta = 0
let pagoTot = 0
let pagoTotal = 0
let pesoTot = 0
let cantProd = 0
let ventas = [] //ARREGLO CONTENEDOR DE TODAS LAS VENTAS

//SELECTORES DE INPUTS CANTIDADES
let cant1 = document.querySelector("#cantKgHF")
let cant2 = document.querySelector("#cantKgHG")
let cant3 = document.querySelector("#cantKgHGal")
let cant4 = document.querySelector("#cantKgAI")
let cant5 = document.querySelector("#cantKgAl")
let cant6 = document.querySelector("#cantKgHA")


let boton1 = document.querySelector(".comprar")
boton1.addEventListener("click", checkcant)
let boton2 = document.querySelector(".buscarVenta")
//boton2.addEventListener("click", verVenta)

let subtotal = document.querySelector("#subtotal")
let newH5 = document.createElement("h5")
subtotal.appendChild(newH5)
newH5.textContent = ""

let boton3 = document.querySelector("#confirmar")
let boton4 = document.querySelector("#cancelar")
boton3.addEventListener("click", confirmar)
boton4.addEventListener("click", cancelar)

let radioInputs = document.querySelectorAll(".radioInput")
for (let i = 0; i < radioInputs.length; i++) {
    radioInputs[i].addEventListener("click",modValue) 
}

//FUNCION BOTON PRIMARIO "INICIAR COMPRA"
//FUNCION VALIDAR CANTIDADES INGRESADAS
function checkcant() {
    let inputs = []
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
    }
    else {
        alert("Error en las cantidades \nVuelva a intentar")
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

    editH5(cantProd,pesoTot,pagoTot)

    document.querySelector("#pie").style.display = "block"
    cant1.setAttribute("disabled", "")
    cant2.setAttribute("disabled", "")
    cant3.setAttribute("disabled", "")
    cant4.setAttribute("disabled", "")
    cant5.setAttribute("disabled", "")
    cant6.setAttribute("disabled", "")
    boton2.setAttribute("disabled","")
    boton2.setAttribute("style", "opacity:0.7")
}

function editH5(cant,peso,pago){
    newH5.innerHTML = `
    Cantidad de items: ${cant}<br><br>
    Peso Total: ${peso} kg<br><br>
    Total a abonar: <strong style="color: red">$${pago}</strong><br><br>
    Cantidad de pagos (5% mensual acumulativo)
    <p>
    <form>
    <span class="radioSpan">1 <input id="1" type="radio" name="cuotas" class="radioInput" value="1" onchange="getValue(this)"></span>
    <span class="radioSpan">3 <input id="3" type="radio" name="cuotas" class="radioInput" value="3" onchange="getValue(this)"></span>
    <span class="radioSpan">6 <input id="6" type="radio" name="cuotas" class="radioInput" value="6" onchange="getValue(this)"></span>
    <span class="radioSpan">9 <input id="9" type="radio" name="cuotas" class="radioInput" value="9" onchange="getValue(this)"></span>
    <span class="radioSpan">12 <input id="12" type="radio" name="cuotas" class="radioInput" value="12" onchange="getValue(this)"></span>
    <span class="radioSpan">18 <input id="18" type="radio" name="cuotas" class="radioInput" value="18" onchange="getValue(this)"></span>
    </form>
    </p>
    `
}

//FUNCION GET RADIO VALUE
function getValue(radio){
    cuotas = radio.value
    pagoTotal = pagoTot
    for (let i = 2; i <= cuotas; i++) {
        pagoTotal *= 1.05
    }
    pagoTotal = Math.floor(pagoTotal)
    editH5(cantProd,pesoTot,pagoTotal)
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
    boton2.removeAttribute("disabled","")
    boton2.removeAttribute("style","opacity:0.7")

}

function checkCantProd(){
    let inputs = document.querySelectorAll(".inputKg")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value>0) {
            cantProd++
        } 
    }
}

//FUNCION CONFRIMAR COMPRA
function confirmar() {
    let vendido = new Venta()
    vendido.numVenta = numVenta
    vendido.fecha = hoyStr
    vendido.pago = pagoTotal
    vendido.pesoTot = pesoTot
    vendido.cantCuotas = cuotas
    vendido.cantProd = cantProd
    ventas.push(vendido)
    alert("Gracias por su compra")
    reiniciar()
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
    boton2.removeAttribute("disabled","")
    boton2.removeAttribute("style", "opacity:0.7")
    cantProd = 0
}

//CLASE PARA GENERADOR DE VENTAS
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

