/* JAVASCRIPT STUDY */

//Html
const html = document.querySelector("html");

//Botoes
const btFoco = document.querySelector(".app__card-button--foco");
const btDescansoCurto = document.querySelector(".app__card-button--curto");
const btDescansoLongo = document.querySelector(".app__card-button--longo");
const allButtons = document.querySelectorAll('.app__card-button')

//Timer
const timer = document.querySelector('#timer')

//Image
let image = document.querySelector(".app__image");
let imageButton = document.querySelector('.app__card-primary-butto-icon')

//Paragrafo
const texto = document.querySelector(".app__title ");

/* Áudios */
//Música
const inputMusic = document.querySelector('#alternar-musica')
const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true

//Play
const audioPlay = new Audio('./sons/play.wav')

//Pausa
const audioPause = new Audio('./sons/pause.mp3')

//Fim
const audioEnd = new Audio('./sons/beep.mp3')


//Temporizador
const btStartPause = document.querySelector('#start-pause')
const btStartPauseContent = document.querySelector('#start-pause span')
let intervalId = null
let tempoRestante = 1500

/*  Event Listener Mudanças na página */
btFoco.addEventListener("click", () => {
    tempoRestante = 1500
    changeSrc('foco')
    btFoco.classList.add('active')
});

btDescansoCurto.addEventListener("click", () => {
    tempoRestante = 300
    changeSrc('descanso-curto')
    btDescansoCurto.classList.add('active')
});

btDescansoLongo.addEventListener("click", () => {
    tempoRestante = 900
    changeSrc('descanso-longo')
    btDescansoLongo.classList.add('active')
});

/* Função mudanças na página */
function changeSrc(changeDocument) {
    html.setAttribute("data-contexto", changeDocument);
    image.setAttribute("src", `/imagens/${changeDocument}.png`);
    contadorDeTempo()
    allButtons.forEach(function (changeDocument) {
        changeDocument.classList.remove('active')
    })
    switch (changeDocument) {
        case 'foco':
            texto.innerHTML = `Otimize sua produtividade, <strong class='app__title-strong'>mergulhe no que importa</strong>`
            break

        case `descanso-curto`:
            texto.innerHTML = `Que tal dar uma respirada? <strong class='app__title-strong'>Faça uma pausa curta!</strong>`
            break

        case `descanso-longo`:
            texto.innerHTML = `Hora de voltar à superfície.            <strong class='app__title-strong'>Faça uma pausa longa.</strong>`
            break
    }
}

/* Event Listener Música */
inputMusic.addEventListener('change', function () {
    music.paused ? music.play() : music.pause();
})

/* FUNÇÃO PARA TEMPORIZADOR */
btStartPause.addEventListener('click', startPauseTemporizador)

//Fim do temporizador
const temporizador = () => {
    if (tempoRestante <= 0) {
        audioEnd.play()
        zerarTemporizador()
        btStartPauseContent.textContent = 'Iniciar'
        imageButton.setAttribute('src', '/imagens/play_arrow.png')
        console.log('Fim')
        return
    }
    tempoRestante -= 1
    contadorDeTempo()
}

//Início e Pausa 
function startPauseTemporizador() {
    if (intervalId) {
        audioPause.play()
        btStartPauseContent.textContent = 'Iniciar'
        imageButton.setAttribute('src', '/imagens/play_arrow.png')
        zerarTemporizador()
        console.log('Pausou')
        return
    }

    intervalId = setInterval(temporizador, 1000)
    audioPlay.play()
    btStartPauseContent.textContent = 'Pausar'
    imageButton.setAttribute('src', '/imagens/pause.png')
    console.log('Iniciou')
}

//Zerar e fim do temporizador
function zerarTemporizador() {
    clearInterval(intervalId)
    intervalId = null
}

/* Contador de tempo */
function contadorDeTempo(changeDocument) {
    const tempo = new Date(tempoRestante * 1000)
    let tempoFormatado = tempo.toLocaleString('pt-BR', { minute: '2-digit', second: '2-digit' })
    timer.innerHTML = `${tempoFormatado}`
}
contadorDeTempo()
