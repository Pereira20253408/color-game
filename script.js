// Variables globales
let selectedColors = [];
const magicSound = new Audio('sounds/magic.mp3'); // Sonido para mezclar
const backgroundMusic = new Audio('sounds/background-music.mp3'); // Música de fondo

// Configuración inicial de la música de fondo
backgroundMusic.loop = true; // Repetir la música
backgroundMusic.volume = 0.5; // Volumen inicial al 50%
let musicStarted = false; // Variable para verificar si la música ha comenzado

// Configuración inicial del sonido "magic"
magicSound.volume = 0.5; // Volumen inicial al 50%

// Referencias a los elementos del DOM
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
const mezclarBtn = document.getElementById('mezclar-btn'); // Referencia al botón de mezclar
const puntuacionElement = document.getElementById('puntuacion'); // Referencia al elemento de puntuación
const logrosLista = document.getElementById('logros'); // Referencia a la lista de logros
<<<<<<< HEAD
=======
const logroPopup = document.getElementById('logro-popup'); // Referencia al popup
>>>>>>> 6c16e2f (actualizacion de animacion y eliminacion del boton siguiente)

let puntuacion = 0; // Inicializar la puntuación
let isMuted = false; // Variable para controlar si la música de fondo está silenciada
let mezclasRealizadas = 0; // Contador de mezclas realizadas

// Definir los logros
const logros = [
  { id: 1, nombre: 'Primeros Pasos', descripcion: 'Mezclaste tu primer color.', criterio: 1 },
  { id: 2, nombre: 'Aprendiz de Color', descripcion: 'Mezclaste 5 colores.', criterio: 5 },
  { id: 3, nombre: 'Maestro de la Mezcla', descripcion: 'Mezclaste 10 colores.', criterio: 10 },
  { id: 4, nombre: 'Colorista Experto', descripcion: 'Mezclaste 20 colores.', criterio: 20 }
];

// Cargar logros alcanzados desde localStorage (si existen)
let logrosAlcanzados = JSON.parse(localStorage.getItem('logrosAlcanzados')) || [];

// Función para guardar los logros alcanzados en localStorage
function guardarLogros() {
  localStorage.setItem('logrosAlcanzados', JSON.stringify(logrosAlcanzados));
}

// Iniciar la música con la interacción del usuario
function startBackgroundMusic() {
  if (!musicStarted) {
    backgroundMusic.play().catch(error => {
      console.error("Error al reproducir la música:", error);
      alert("La reproducción automática de música está bloqueada en este navegador. Interactúa con la página para habilitar la música.");
    });
    musicStarted = true;
    document.removeEventListener('click', startBackgroundMusic); // Remover el event listener después de la primera interacción
  }
}

// Iniciar la música al primer clic
document.addEventListener('click', startBackgroundMusic);

// Función para cambiar entre pestañas
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // Desactivar todas las pestañas
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activar la pestaña seleccionada
    const tabId = button.getAttribute('data-tab');
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Función para manejar la selección de colores (Juego de Mezcla)
document.querySelectorAll('.circle').forEach(circle => {
  circle.addEventListener('click', () => {
    if (!musicStarted) {
      backgroundMusic.play();
      musicStarted = true;
    }

    if (selectedColors.length >= 2) {
      alert('Solo puedes seleccionar dos colores.');
      return;
    }

    // Obtener el color seleccionado
    const color = circle.getAttribute('data-color');

    // Reproducir el sonido del color
    const colorSound = new Audio(`sounds/${color}.mp3`);
    colorSound.currentTime = 0;
    colorSound.play();

    // Alternar la selección del círculo
    circle.classList.toggle('selected');

    if (circle.classList.contains('selected')) {
      selectedColors.push(color);
    } else {
      selectedColors = selectedColors.filter(selectedColor => selectedColor !== color);
    }

    // Activar/desactivar animación del botón "Mezclar"
    if (selectedColors.length === 2) {
      mezclarBtn.classList.add('animar');
    } else {
      mezclarBtn.classList.remove('animar');
    }
  });
});

function cambiarFondo(color) {
  document.body.style.background = `linear-gradient(135deg, ${color}, #ffffff)`;
  document.body.style.backgroundSize = "300% 300%";
  document.body.style.animation = "gradient-animation 10s ease infinite";
}

// Función para verificar y mostrar los logros desbloqueados
function verificarLogros() {
  logros.forEach(logro => {
    if (mezclasRealizadas >= logro.criterio && !logrosAlcanzados.includes(logro.id)) {
      logrosAlcanzados.push(logro.id);
      mostrarLogro(logro);
<<<<<<< HEAD
=======
      mostrarLogroPopup(logro.nombre); // Mostrar el popup
>>>>>>> 6c16e2f (actualizacion de animacion y eliminacion del boton siguiente)
      guardarLogros();
      console.log(`¡Logro desbloqueado: ${logro.nombre}!`); // Depuración
    }
  });
}

// Función para mostrar un logro desbloqueado
function mostrarLogro(logro) {
  const li = document.createElement('li');
  li.textContent = `${logro.nombre}: ${logro.descripcion}`;
  logrosLista.appendChild(li);
}

<<<<<<< HEAD
=======
// Función para mostrar el popup del logro
function mostrarLogroPopup(nombreLogro) {
  logroPopup.textContent = `¡Logro desbloqueado: ${nombreLogro}!`;
  logroPopup.classList.add('show');

  setTimeout(() => {
    logroPopup.classList.remove('show');
  }, 3000); // Ocultar después de 3 segundos
}

>>>>>>> 6c16e2f (actualizacion de animacion y eliminacion del boton siguiente)
// Función para mezclar colores
document.getElementById('mezclar-btn').addEventListener('click', () => {
  if (selectedColors.length < 2) {
    alert('Debes seleccionar dos colores para mezclar.');
    return;
  }

  magicSound.currentTime = 0;
  magicSound.play();

  const color1 = selectedColors[0];
  const color2 = selectedColors[1];
  let resultColor, resultName, resultSoundFile;
  let mezclaCorrecta = false; // Variable para verificar si la mezcla es correcta

  if ((color1 === 'amarillo' && color2 === 'azul') || (color1 === 'azul' && color2 === 'amarillo')) {
    resultColor = 'green';
    resultName = 'Verde';
    resultSoundFile = 'verde';
    mezclaCorrecta = true;
  } else if ((color1 === 'amarillo' && color2 === 'rojo') || (color1 === 'rojo' && color2 === 'amarillo')) {
    resultColor = 'orange';
    resultName = 'Naranja';
    resultSoundFile = 'naranja';
    mezclaCorrecta = true;
  } else if ((color1 === 'amarillo' && color2 === 'verde') || (color1 === 'verde' && color2 === 'amarillo')) {
    resultColor = '#bfff00'; // Verde amarillento (Lima)
    resultName = 'Verde amarillento (Lima)';
    resultSoundFile = 'verdelima';
    mezclaCorrecta = true;
  } else if ((color1 === 'amarillo' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'amarillo')) {
    resultColor = '#ecec53'; // Amarillo claro (Crema)
    resultName = 'Amarillo claro (Crema)';
    resultSoundFile = 'amarilloclaro';
    mezclaCorrecta = true;
  } else if ((color1 === 'azul' && color2 === 'rojo') || (color1 === 'rojo' && color2 === 'azul')) {
    resultColor = 'purple';
    resultName = 'Violeta (Púrpura)';
    resultSoundFile = 'violeta';
    mezclaCorrecta = true;
  } else if ((color1 === 'azul' && color2 === 'verde') || (color1 === 'verde' && color2 === 'azul')) {
    resultColor = '#00ffff'; // Verde azulado (Turquesa)
    resultName = 'Verde azulado (Turquesa)';
    resultSoundFile = 'turquesa';
    mezclaCorrecta = true;
  } else if ((color1 === 'azul' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'azul')) {
    resultColor = '#add8e6'; // Azul claro (Celeste)
    resultName = 'Azul claro (Celeste)';
    resultSoundFile = 'celeste';
    mezclaCorrecta = true;
  } else if ((color1 === 'rojo' && color2 === 'verde') || (color1 === 'verde' && color2 === 'rojo')) {
    resultColor = 'brown';
    resultName = 'Marrón';
    resultSoundFile = 'marron';
    mezclaCorrecta = true;
  } else if ((color1 === 'rojo' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'rojo')) {
    resultColor = 'pink';
    resultName = 'Rosa';
    resultSoundFile = 'rosa';
    mezclaCorrecta = true;
  } else if ((color1 === 'verde' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'verde')) {
    resultColor = '#98fb98'; // Verde claro (Menta)
    resultName = 'Verde claro (Menta)';
    resultSoundFile = 'verdementa';
    mezclaCorrecta = true;
  } else {
    resultColor = 'gray';
    resultName = 'Gris';
    resultSoundFile = 'gris';
  }

  // Mostrar el resultado
  document.getElementById('resultado-color').style.backgroundColor = resultColor;
  document.getElementById('resultado-nombre').textContent = `${resultName}`;

  // Reproducir el sonido del color resultante
  const resultSound = new Audio(`sounds/${resultSoundFile}.mp3`);
  resultSound.currentTime = 0;
  resultSound.play();
  
  if (mezclaCorrecta) {
    mezclasRealizadas++; // Incrementar el contador de mezclas realizadas
    console.log(`Mezclas realizadas: ${mezclasRealizadas}`); // Depuración
    puntuacion += 10; // otorga 10 puntos por cada mezcla correcta
    puntuacionElement.textContent = `Puntuación: ${puntuacion}`;
    puntuacionElement.style.color = resultColor; // Cambiar el color de la puntuación
    document.body.style.background = `linear-gradient(135deg, ${resultColor}, #ffffff)`; // Cambiar el fondo
    //cambiarFondo(resultColor);
    verificarLogros(); // Verificar si se desbloqueó un logro
  }

  // Limpiar selección
  selectedColors = [];
  document.querySelectorAll('.circle').forEach(circle => circle.classList.remove('selected'));
  mezclarBtn.classList.remove('animar');
});

// Función para aprender colores
document.querySelectorAll('.learn-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    // Obtener el nombre del color seleccionado
    const colorName = circle.getAttribute('data-color');

    // Reproducir el sonido del color
    const colorSound = new Audio(`sounds/${colorName.toLowerCase()}.mp3`);
    colorSound.currentTime = 0;
    colorSound.play();

    // Mostrar el nombre del color seleccionado
    document.getElementById('color-name').textContent = `Nombre del color: ${colorName}`;
  });
});

// Control de volumen
volumeSlider.addEventListener('input', () => {
  const volumeValue = parseFloat(volumeSlider.value); // Obtener el valor del control
  backgroundMusic.volume = volumeValue; // Aplicar el volumen a la música de fondo
});

// Botón de silencio
muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  backgroundMusic.muted = isMuted;

  // Cambiar las clases del icono del botón
  if (isMuted) {
    muteBtn.classList.remove('fa-volume-up');
    muteBtn.classList.add('fa-volume-mute');
  } else {
    muteBtn.classList.remove('fa-volume-mute');
    muteBtn.classList.add('fa-volume-up');
  }
});

// Al cargar la página, mostrar los logros ya alcanzados
window.onload = () => {
  logrosAlcanzados.forEach(logroId => {
    const logro = logros.find(l => l.id === logroId);
    if (logro) {
      mostrarLogro(logro);
    }
  });
};