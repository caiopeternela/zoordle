import("./confetti.js")

const objetoPalavraDoDia = {
    '2022/8/17': ['aguia', 'uma ave'], '2022/8/18': ['arara', 'uma ave'], '2022/8/19': ['bagre', 'um peixe',],
    '2022/8/20': ['cobra', 'um réptil'],'2022/8/21': ['porco', 'um mamífero'],'2022/8/22': ['carpa', 'um peixe'],
    '2022/8/23': ['ostra', 'um molusco'],'2022/8/24': ['lesma', 'um molusco'],'2022/8/25': ['touro', 'um mamífero'],
    '2022/8/26': ['urubu', 'uma ave'],'2022/8/27': ['zebra', 'um mamífero'],'2022/8/28': ['vespa', 'um inseto'],
    '2022/8/29': ['coala', 'um mamífero'],'2022/8/30': ['cupim', 'um inseto'],'2022/8/31': ['panda', 'um mamífero'],
    '2022/9/1': ['polvo', 'um molusco'],'2022/9/2': ['lhama', 'um mamífero'], '2022/9/3': ['tigre', 'um mamífero'],
    '2022/9/4': ['truta', 'um peixe'], '2022/9/5': ['pombo', 'uma ave'], '2022/9/6': ['corvo', 'uma ave'], 
    '2022/9/7': ['burro', 'um mamífero'], '2022/9/8': ['cabra', 'um mamífero'], '2022/9/9': ['pavao', 'uma ave'],
    '2022/9/10': ['morsa', 'um mamífero'], '2022/9/11': ['coral', 'um cnidário'], '2022/9/12': ['cacao', 'um peixe'],
    '2022/9/13': ['jegue', 'um mamífero'], '2022/9/14': ['peixe', 'um grupo de animais']
}

data = new Date()
ano = data.getFullYear()
mes = data.getMonth()+1
dia = data.getDate()
dataFormatada = `${ano}/${mes}/${dia}`

for (dia in objetoPalavraDoDia) {
    if (dataFormatada == dia) {
        var palavraDoDia = objetoPalavraDoDia[dia][0]
        var dicaDoDia = objetoPalavraDoDia[dia][1]
    } 
}

if (dataFormatada[5] > 8) {
    var palavraDoDia = 'panda'
    var dicaDoDia = 'um mamífero'
}

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
    closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

document.getElementById("modal-body").innerHTML = `Dica do dia: o animal escolhido é ${dicaDoDia}!`

let linha1 = document.getElementById("linha-caixa-1").children
let linha2 = document.getElementById("linha-caixa-2").children
let linha3 = document.getElementById("linha-caixa-3").children
let linha4 = document.getElementById("linha-caixa-4").children
let linha5 = document.getElementById("linha-caixa-5").children
let linha6 = document.getElementById("linha-caixa-6").children
let teclado = document.getElementsByTagName("button")

document.addEventListener('keydown', function (e) {
    if (e.key.toString().toUpperCase().charCodeAt(0) >= 65 && e.key.toString().toUpperCase().charCodeAt(0) <= 90 && e.key.toString().length == 1) {
        letraDigitadaLocal = e.key.toString().toUpperCase();
        for (let i = 0; i <= 4; i++) {
            if (linha1[i].innerHTML == '') {
                linha1[i].innerHTML = letraDigitadaLocal
                linha1[i].classList.add("vazio")
                break
            }
        }
    } else if (e.key.toString().toUpperCase() == "ENTER") {
        validaPalavra()
    } else if (e.key.toString().toUpperCase() == "BACKSPACE") {
        removeLetra()
    }
}, false);

function mostraLetraNoBoard(tagLetra) {
    letraDigitada = tagLetra.innerHTML

    for (let i = 0; i <= 4; i++) {
        if (linha1[i].innerHTML == '') {
            linha1[i].innerHTML = letraDigitada
            linha1[i].classList.add("vazio")
            break
        }
    }
}

function removeLetra() {
    for (let i = 4; i >= 0; i--) {
        if (linha1[i].innerHTML != '') {
            linha1[i].innerHTML = ''
            linha1[i].classList.remove("vazio")
            linha1[i].classList.remove("certo")
            linha1[i].classList.remove("meio-certo")
            linha1[i].classList.remove("errado")
            break
        }
    }
}

var contadorLinhas = 1

function validaPalavra() {
    function letraRepete(letra) {
        contador = 0
        for (elemento of palavraDoDia) {
            if (letra.toLowerCase() == elemento) {
                contador++
            }
        }
        if (contador > 1){
            return true
        } else {
            return false
        }
    }

    let palavra = []
    let palavraCertaLista = palavraDoDia.toUpperCase().split("")

    for (let i = 0; i <= 4; i++) {
        if (linha1[i].innerHTML != '') {
            palavra.push(linha1[i].innerHTML)
        }
    }

    var palavraCertaReversa = palavra.join("").split("").reverse().join("")
    var stringPalavra = palavra.join("").toLowerCase()

    function existeNoObjeto(stringPalavra) {
        contador = 0
        for (dia in objetoPalavraDoDia) {
            if (objetoPalavraDoDia[dia][0] == stringPalavra) {
                contador++
            } 
        }
        if (contador > 0) {
            return true
        } else {
            return false
        }
    }

    if (existeNoObjeto(stringPalavra) == false || palavra.length < 5) {
        return
    }

    var letrasVerdes = []
    var letrasBeges = []

    for (let tecla in teclado) {
        for (letra in palavraCertaReversa){
            if (letraRepete(palavraCertaReversa[letra]) == false && letrasVerdes.includes(palavraCertaReversa[letra])){
                if (linha1[letra].classList.contains("meio-certo")) {
                    linha1[letra].classList.remove("meio-certo")
                }
            }
        }
        for (letra in palavra) {
            if (palavra[letra] == palavraCertaLista[letra]) {
                linha1[letra].classList.add("certo")
                linha1[letra].classList.add("animacao")
                linha1[letra].classList.remove("vazio")
                if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                    teclado[tecla].classList.add("certo")
                    teclado[tecla].classList.add("animacao")
                    teclado[tecla].classList.remove("meio-certo")
                    teclado[tecla].classList.remove("errado")
                    teclado[tecla].classList.remove("outros")
                }
                letrasVerdes.push(palavra[letra])
            } else if (palavraCertaLista.includes(palavra[letra]) && palavra[letra] != palavraCertaLista[letra]) {
                if (letraRepete(palavra[letra]) == false && letrasBeges.includes(palavra[letra]) == false && letrasVerdes.includes(palavra[letra]) == false) {
                    linha1[letra].classList.add("meio-certo")
                    linha1[letra].classList.add("animacao")
                    linha1[letra].classList.remove("vazio")
                    if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                        teclado[tecla].classList.add("meio-certo")
                        teclado[tecla].classList.add("animacao")
                        teclado[tecla].classList.remove("outros")
                    }
                    letrasBeges.push(palavra[letra])
                } else {
                    linha1[letra].classList.add("errado")
                    linha1[letra].classList.add("animacao")
                    linha1[letra].classList.remove("vazio")
                    if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                        teclado[tecla].classList.add("errado")
                        teclado[tecla].classList.add("animacao")
                        teclado[tecla].classList.remove("outros")
                    }
                }
            } else {
                linha1[letra].classList.add("errado")
                linha1[letra].classList.add("animacao")
                linha1[letra].classList.remove("vazio")
                if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                    teclado[tecla].classList.add("errado")
                    teclado[tecla].classList.add("animacao")
                    teclado[tecla].classList.remove("outros")
                }
            }
        }
    }

    var segundos = 0

    if (palavraDoDia == stringPalavra) {
        linha1 = ""
        startConfetti();
        setInterval(function(){
            if (segundos == 10){
                stopConfetti()
            }
            segundos++
        }, 1000)
    } 
    else {
        if (contadorLinhas == 1) {
            linha1 = linha2
            contadorLinhas += 1
        } else if (contadorLinhas == 2) {
            linha1 = linha3
            contadorLinhas += 1
        } else if (contadorLinhas == 3) {
            linha1 = linha4
            contadorLinhas += 1
        } else if (contadorLinhas == 4) {
            linha1 = linha5
            contadorLinhas += 1
        } else if (contadorLinhas == 5) {
            linha1 = linha6
            contadorLinhas += 1
        } else {
            linha1 = ""
        }
    }
}
