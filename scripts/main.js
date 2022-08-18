const objetoPalavraDoDia = {
    '2022/8/17': ['aguia', 'uma ave'], '2022/8/18': ['arara', 'uma ave'], '2022/8/19': ['bagre', 'um peixe',],
    '2022/8/20': ['cobra', 'um réptil'],'2022/8/21': ['porco', 'um mamífero'],'2022/8/22': ['carpa', 'um peixe'],
    '2022/8/23': ['ostra', 'um molusco'],'2022/8/24': ['lesma', 'um molusco'],'2022/8/25': ['touro', 'um mamífero'],
    '2022/8/26': ['urubu', 'uma ave'],'2022/8/27': ['zebra', 'um mamífero'],'2022/8/28': ['vespa', 'um inseto'],
    '2022/8/29': ['coala', 'um mamífero'],'2022/8/30': ['cupim', 'um inseto'],'2022/8/31': ['panda', 'um mamífero'],
    '2022/9/1': ['polvo', 'um molusco'],'2022/9/2': ['lhama', 'um mamífero'], '2022/9/3': ['tigre', 'um mamífero'],
    '2022/9/4': ['truta', 'um peixe'], '2022/9/5': ['pombo', 'uma ave']
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
        let contador = 0;
        for (let elemento of palavraDoDia) {
            if (letra == elemento.toUpperCase()) {
                contador++
            }
        }
        if (contador > 1) {
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

    let stringPalavra = palavra.join("").toLowerCase()

    if (palavra.length < 5) {
        return
    }

    let letrasCinzas = []
    let letrasVerdes = []

    for (let tecla in teclado) {
        for (letra in palavra) {
            console.log(palavra.join(""))
            console.log(palavraDoDia)
            if (palavra.join("").toLowerCase() == palavraDoDia) {
                linha1[letra].classList.add("certo")
                linha1[letra].classList.remove("vazio")
                if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                    teclado[tecla].classList.add("certo")
                    teclado[tecla].classList.remove("outros")
                }
            }
            if (palavraCertaLista.includes(palavra[letra]) && letraRepete(palavra[letra]) == false &&
            letrasVerdes.includes(palavra[letra]) == false || letraRepete(palavra[letra]) && letrasVerdes.includes(palavra[letra]) == false) {
                linha1[letra].classList.add("certo")
                linha1[letra].classList.remove("vazio")
                if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                    teclado[tecla].classList.add("certo")
                    teclado[tecla].classList.remove("outros")
                }
                letrasVerdes.push(palavra[letra])
            } else {
                linha1[letra].classList.add("errado")
                linha1[letra].classList.remove("vazio")
                if (linha1[letra].classList.contains("certo")) {
                    if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                        teclado[tecla].classList.add("certo")
                        teclado[tecla].classList.remove("outros")
                    }
                } else {
                    if (teclado[tecla].innerHTML == linha1[letra].innerHTML) {
                        teclado[tecla].classList.add("errado")
                        teclado[tecla].classList.remove("outros")
                    }
                    letrasCinzas.push(palavra[letra])
                }
            }
        }
    }

    if (palavraDoDia == stringPalavra) {
        linha1 = ""
    } else {
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
