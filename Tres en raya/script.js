let turno = 'X'; // Alternar entre 'X' y 'O'

// Permitir soltar
function permitirSoltar(event) {
    event.preventDefault();
}

// Arrastrar elemento
function arrastrar(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Soltar elemento
function soltar(event) {
    event.preventDefault();
    let id = event.dataTransfer.getData("text");
    let ficha = document.getElementById(id);

    // Verificar si ya hay una ficha en la caja
    if (event.target.classList.contains('caja') && event.target.children.length === 0) {
        event.target.appendChild(ficha);
        verificarGanador();
        alternarTurno();
    } else {
        alert("¡Esta casilla ya está ocupada!");
    }
}

// Alternar turnos
function alternarTurno() {
    turno = (turno === 'X') ? 'O' : 'X';
}

// Verificar si alguien ganó
function verificarGanador() {
    const combinaciones = [
        [0,1,2],[3,4,5],[6,7,8], // filas
        [0,3,6],[1,4,7],[2,5,8], // columnas
        [0,4,8],[2,4,6]          // diagonales
    ];

    let celdas = document.querySelectorAll('.tablero .caja');

    for (let combo of combinaciones) {
        let [a, b, c] = combo;
        let ca = celdas[a].firstChild;
        let cb = celdas[b].firstChild;
        let cc = celdas[c].firstChild;

        if (ca && cb && cc &&
            ca.className === cb.className &&
            cb.className === cc.className) {
            alert(`¡${turno} ha ganado!`);
            reiniciarJuego();
            break;
        }
    }
}

// Reiniciar tablero (opcional)
function reiniciarJuego() {
    const celdas = document.querySelectorAll('.tablero .caja');
    celdas.forEach(caja => {
        while (caja.firstChild) {
            caja.removeChild(caja.firstChild);
        }
    });
}