import { Animal, cargarDatosAnimales } from './animales.js';

(() => {
  const manejarAgregarAnimal = async () => {
    const nombre = document.getElementById('animal').value;
    const edad = document.getElementById('edad').value;
    const comentarios = document.getElementById('comentarios').value;

    if (nombre && edad && comentarios) {
      const animales = await cargarDatosAnimales();
      const animalData = animales.find(a => a.name === nombre);
      if (animalData) {
        const animal = new Animal(edad, comentarios);
        Object.assign(animal, animalData);

        const animalDiv = document.createElement('div');
        animalDiv.classList.add('animal');
        const imagenUrl = `assets/imgs/${animal.imagen}`;
        const imagenElement = document.createElement('img');
        imagenElement.src = imagenUrl;
        imagenElement.alt = animal.name;
        animalDiv.appendChild(imagenElement);

        const iconoParlante = document.createElement('i');
        iconoParlante.classList.add('fas', 'fa-volume-up');
        iconoParlante.dataset.animal = animal.name; 
        iconoParlante.addEventListener('click', manejarReproducirSonido);
        animalDiv.appendChild(iconoParlante);

        document.getElementById('Animales').appendChild(animalDiv);

        // Agregar elemento de audio
        const audioElement = document.createElement('audio');
        audioElement.src = `assets/sounds/${animal.sonido}`;
        audioElement.dataset.animal = animal.name; 
        animalDiv.appendChild(audioElement);

        document.getElementById('animal').selectedIndex = 0;
        document.getElementById('edad').selectedIndex = 0;
        document.getElementById('comentarios').value = '';
      } else {
        alert('Animal no encontrado en los datos.');
      }
    } else {
      alert('Por favor complete todos los campos');
    }
  };

  const manejarReproducirSonido = (event) => {
    const nombreAnimal = event.target.dataset.animal; 
    const animal = event.target.closest('.animal');
    const audio = animal.querySelector('audio');
    audio.play();
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnRegistrar').addEventListener('click', manejarAgregarAnimal);
  });
})();
