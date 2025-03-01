// Variable global para almacenar el color elegido
let colorSeleccionado = "#4CAF50"; // Color predeterminado
let modoArrastre = false;
let mousePresionado = false;

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
    cell.classList.add("cell");
    cell.id = `cell-${i}`;
    container.appendChild(cell);
  }

  // Evento para detectar mousedown
  container.addEventListener("mousedown", function (event) {
    if (event.target.classList.contains("cell")) {
      mousePresionado = true; // El mouse está presionado
      modoArrastre = true; // Activar el modo de arrastre
      console.log("Modo arrastre activado en mousedown");
    }
  });

  // Evento para detectar mouseup
  container.addEventListener("mouseup", function () {
    if (modoArrastre) {
      console.log("Modo arrastre desactivado en mouseup");
      modoArrastre = false; // Desactivar el modo arrastre
      mousePresionado = false; // El mouse ya no está presionado
    }
  });

  // Evento para detectar click en celdas
  container.addEventListener("click", function (event) {
    if (event.target.classList.contains("cell")) {
      const cell = event.target;
      const celdasSeleccionadas = document.querySelectorAll(".cell.active");

      console.log(`Click en: ${cell.id}, Celdas seleccionadas: ${celdasSeleccionadas.length}`);

      if (cell.classList.contains("active")) {
        cell.classList.remove("active");
        cell.style.backgroundColor = "white";
      } else {
        cell.classList.add("active");
        cell.style.backgroundColor = colorSeleccionado;
      }

      // Modo arrastre solo si hay más de una celda seleccionada
      if (celdasSeleccionadas.length > 1) {
        modoArrastre = true;
      } else {
        modoArrastre = false;
      }
    }
  });

  // Evento para detectar mouseover y pintar solo si el mouse está presionado
  container.addEventListener("mouseover", function (event) {
    if (modoArrastre && mousePresionado && event.target.classList.contains("cell")) {
      const cell = event.target;
      if (!cell.classList.contains("active")) {
        cell.classList.add("active");
        cell.style.backgroundColor = colorSeleccionado;
        console.log(`Celda activada en arrastre: ${cell.id}`);
      }
    }
  });

  // Evento de clic derecho para seleccionar color
  container.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    if (event.target.classList.contains("cell")) {
      const colorMenu = document.getElementById("colorMenu");
      colorMenu.style.top = `${event.clientY}px`;
      colorMenu.style.left = `${event.clientX}px`;
      colorMenu.style.opacity = "1";
      colorMenu.style.display = "block";
    }
  });

  // Evento para seleccionar color
  document.querySelectorAll("#colorMenu button").forEach((button) => {
    button.addEventListener("click", function () {
      colorSeleccionado = button.style.backgroundColor;
      const colorMenu = document.getElementById("colorMenu");
      colorMenu.style.opacity = "0";
      setTimeout(() => {
        colorMenu.style.display = "none";
      }, 300);
    });
  });

  // Evento para cerrar el menú de color
  document.addEventListener("click", function (event) {
    const colorMenu = document.getElementById("colorMenu");
    if (!colorMenu.contains(event.target) && !event.target.classList.contains("cell")) {
      colorMenu.style.opacity = "0";
      setTimeout(() => {
        colorMenu.style.display = "none";
      }, 300);
    }
  });
}

// Renderizar la grilla al cargar
window.onload = renderGrid;

// Volver a calcular si cambia el tamaño de la pantalla
window.onresize = renderGrid;
