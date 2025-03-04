// Variables globales
let selectedColors = [];
const popSound = new Audio('sounds/pop.mp3'); // Sonido para seleccionar colores
const magicSound = new Audio('sounds/magic.mp3'); // Sonido para mezclar
const backgroundMusic = new Audio('sounds/background-music.mp3'); // Música de fondo

// Configuración inicial de la música de fondo
backgroundMusic.loop = true; // Repetir la música
backgroundMusic.volume = 0.5; // Volumen inicial al 50%
let musicStarted = false; // Variable para verificar si la música ha comenzado

// Referencias a los elementos del DOM
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');

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

    popSound.currentTime = 0;
    popSound.play();

    circle.classList.toggle('selected');
    const color = circle.getAttribute('data-color');

    if (circle.classList.contains('selected')) {
      selectedColors.push(color);
    } else {
      selectedColors = selectedColors.filter(selectedColor => selectedColor !== color);
    }
  });
});

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
  let resultColor, resultName;

  if ((color1 === 'amarillo' && color2 === 'azul') || (color1 === 'azul' && color2 === 'amarillo')) {
    resultColor = 'green';
    resultName = 'Verde';
  } else if ((color1 === 'amarillo' && color2 === 'rojo') || (color1 === 'rojo' && color2 === 'amarillo')) {
    resultColor = 'orange';
    resultName = 'Naranja';
  } else if ((color1 === 'amarillo' && color2 === 'verde') || (color1 === 'verde' && color2 === 'amarillo')) {
    resultColor = '#bfff00'; // Verde amarillento (Lima)
    resultName = 'Verde amarillento (Lima)';
  } else if ((color1 === 'amarillo' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'amarillo')) {
    resultColor = '#ecec53'; // Amarillo claro (Crema)
    resultName = 'Amarillo claro (Crema)';
  } else if ((color1 === 'azul' && color2 === 'rojo') || (color1 === 'rojo' && color2 === 'azul')) {
    resultColor = 'purple';
    resultName = 'Violeta (Púrpura)';
  } else if ((color1 === 'azul' && color2 === 'verde') || (color1 === 'verde' && color2 === 'azul')) {
    resultColor = '#00ffff'; // Verde azulado (Turquesa)
    resultName = 'Verde azulado (Turquesa)';
  } else if ((color1 === 'azul' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'azul')) {
    resultColor = '#add8e6'; // Azul claro (Celeste)
    resultName = 'Azul claro (Celeste)';
  } else if ((color1 === 'rojo' && color2 === 'verde') || (color1 === 'verde' && color2 === 'rojo')) {
    resultColor = 'brown';
    resultName = 'Marrón';
  } else if ((color1 === 'rojo' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'rojo')) {
    resultColor = 'pink';
    resultName = 'Rosa';
  } else if ((color1 === 'verde' && color2 === 'blanco') || (color1 === 'blanco' && color2 === 'verde')) {
    resultColor = '#98fb98'; // Verde claro (Menta)
    resultName = 'Verde claro (Menta)';
  } else {
    resultColor = 'gray';
    resultName = 'Gris';
  }

  document.getElementById('resultado-color').style.backgroundColor = resultColor;
  document.getElementById('resultado-nombre').textContent = `Nombre del color: ${resultName}`;

  selectedColors = [];
  document.querySelectorAll('.circle').forEach(circle => circle.classList.remove('selected'));
});

// Función para aprender colores
document.querySelectorAll('.learn-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    // Reproducir el sonido "pop"
    popSound.currentTime = 0; // Reiniciar el sonido para que pueda reproducirse nuevamente
    popSound.play();

    // Mostrar el nombre del color seleccionado
    const colorName = circle.getAttribute('data-color');
    document.getElementById('color-name').textContent = `Nombre del color: ${colorName}`;
  });
});

// Control de volumen
volumeSlider.addEventListener('input', () => {
  backgroundMusic.volume = volumeSlider.value;
});

// Botón de silencio
let isMuted = false;
muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  if (isMuted) {
    backgroundMusic.muted = true;
    muteBtn.classList.remove('fa-volume-up');
    muteBtn.classList.add('fa-volume-mute');
  } else {
    backgroundMusic.muted = false;
    muteBtn.classList.remove('fa-volume-mute');
    muteBtn.classList.add('fa-volume-up');
  }
});