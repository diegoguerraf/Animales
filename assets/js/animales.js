export class Animal {
    constructor(edad, comentarios) {
      this.edad = edad;
      this.comentarios = comentarios;
    }
  
    reproducirSonido() {
      if (this.sonido) {
        const audio = new Audio(`assets/sounds/${this.sonido}`);
        audio.play();
      } else {
        console.log("No se pudo reproducir el sonido. El sonido no está definido para este animal.");
      }
    }
  }
  
  export async function cargarDatosAnimales() {
    try {
      const response = await fetch('animales.json');
      if (!response.ok) {
        throw new Error(`Error al cargar los datos de animales: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.animales;
    } catch (error) {
      console.error("Error al cargar los datos de animales:", error);
      return [];
    }
  }
  