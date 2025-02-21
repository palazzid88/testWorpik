// Variable global para almacenar el color elegido
let colorSeleccionado = "#4CAF50"; // Color predeterminado (verde)
let modoArrastre = false; // Declaración de la variable modoArrastre

// Función para renderizar la grilla
function renderGrid() {
  const container = document.getElementById("grid-container");

  const cellSize = window.innerWidth / 100; // Tamaño de las celdas
  const rows = Math.floor(window.innerHeight / cellSize); // Cantidad de filas
  const totalCells = 100 * rows; // Total de celdas

  container.innerHTML = ""; // Limpiar contenedor antes de renderizar

  // Crear celdas dinámicamente
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell"); // Clase para los estilos css
    cell.id = `cell-${i}`; // Asigno un id único para identifiacar cada celda
    container.appendChild(cell);
    console.log(`Celda ${i} creada con ID: cell-${i}`);
  }

  // Capturar el evento de mousedown para iniciar el arrastre
  container.addEventListener("mousedown", function(event) {
    if (event.target.classList.contains("cell")) {
      console.log("Modo arrastre activado en mousedown");
      modoArrastre = true; // Activar el modo arrastre
    }
  });

  // Capturar el evento de mouseup para desactivar el arrastre
  container.addEventListener("mouseup", function() {
    if (modoArrastre) {
      console.log("Modo arrastre desactivado en mouseup");
      modoArrastre = false; // Desactivar el modo arrastre
    }
  });

  // Capturar el evento de click sobre las celdas
  container.addEventListener("click", function(event) {
    if (event.target.classList.contains("cell")) {
      const cell = event.target;
      const celdasSeleccionadas = document.querySelectorAll(".cell.active");

      console.log(`Click detectado en una celda: ${cell.id}`);
      console.log(`Celdas seleccionadas: ${celdasSeleccionadas.length}`);

      // Lógica para activar/desactivar celdas
      if (cell.classList.contains("active")) {
        cell.classList.remove("active");
        cell.style.backgroundColor = "white";
        console.log(`Celda desactivada: ${cell.id}`);
      } else {
        cell.classList.add("active");
        cell.style.backgroundColor = colorSeleccionado;
        console.log(`Celda activada: ${cell.id}`);
      }

      // Detectar si el modo de arrastre se debe activar
      if (celdasSeleccionadas.length > 1) {
        modoArrastre = true;
        console.log("Modo arrastre activado");
      } else {
        modoArrastre = false;
        console.log("Modo arrastre desactivado, solo hay una celda seleccionada");
      }
    }
  });

  // Capturar el evento de mouseover (cuando se hace arrastre sobre celdas)
  container.addEventListener("mouseover", function(event) {
    if (modoArrastre && event.target.classList.contains("cell")) {
      const cell = event.target;

      if (!cell.classList.contains("active")) {
        cell.classList.add("active");
        cell.style.backgroundColor = colorSeleccionado;
        console.log(`Celda activada durante arrastre: ${cell.id}`);
      }
    }
  });

  // Capturar el evento de clic derecho sobre las celdas para cambiar el color
  container.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevenir el menú contextual predeterminado del navegador
    if (event.target.classList.contains("cell")) {
      const cell = event.target;
      console.log(`Clic derecho en la celda ${cell.id}`);

      // Mostrar el menú de colores en la posición del clic con fadeIn
      const colorMenu = document.getElementById("colorMenu");
      colorMenu.style.top = `${event.clientY}px`;
      colorMenu.style.left = `${event.clientX}px`;
      colorMenu.style.opacity = "1"; // Hacer visible con opacidad
      colorMenu.style.display = "block"; // Asegurarse de que el menú esté en el flujo
      console.log("Menú de colores mostrado");

      // Aplicar transición para desvanecer el menú
      setTimeout(() => {
        colorMenu.style.transition = "opacity 0.3s ease-in-out";
      }, 10); // Tiempo de espera para que la transición se aplique después de mostrarlo
    }
  });

  // Capturar el evento de selección de color en el menú
  const colorButtons = document.querySelectorAll("#colorMenu button");
  colorButtons.forEach(button => {
    button.addEventListener("click", function() {
      colorSeleccionado = button.style.backgroundColor;
      console.log(`Color seleccionado: ${colorSeleccionado}`);

      // Cerrar el menú de colores con fadeOut
      const colorMenu = document.getElementById("colorMenu");
      colorMenu.style.opacity = "0"; // Hacer desaparecer con opacidad
      setTimeout(() => {
        colorMenu.style.display = "none"; // Ocultar el menú después del fadeOut
      }, 300); // Esperar el tiempo de la animación antes de ocultarlo
      console.log("Menú de colores cerrado");
    });
  });

  // Cerrar el menú si se hace clic fuera de él o si se mueve el cursor fuera del menú
  document.addEventListener("click", function(event) {
    const colorMenu = document.getElementById("colorMenu");
    if (!colorMenu.contains(event.target) && !event.target.classList.contains("cell")) {
      colorMenu.style.opacity = "0"; // Desvanecer el menú con opacidad
      setTimeout(() => {
        colorMenu.style.display = "none"; // Ocultar el menú después de desvanecerlo
      }, 300); // Esperar la duración de la animación de desvanecimiento
      console.log("Menú de colores cerrado al hacer clic fuera de él");
    }
  });
}

// Renderizar la grilla al cargar
window.onload = renderGrid;

// Volver a calcular si cambia el tamaño de la pantalla
window.onresize = renderGrid;
