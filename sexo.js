class Bus {
  constructor(nombre, minutos) {
    this.siguiente = null;
    this.anterior = null;
    this.nombre = nombre;
    this.minutos = minutos;
  }
  infoHTML() {
    return `
        <div class="bus">
            <h1>${this.nombre}</h1>
            <p>${this.minutos}</p>
        </div>
        `;
  }
}

class Ruta {
  constructor() {
    this.primero = null;
  }

  agregar(nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
      this.primero.siguiente = this.primero;
      this.primero.anterior = this.primero;
    } else {
      let aux = this.primero;
      while (aux.siguiente !== this.primero) {
        aux = aux.siguiente;
      }
      aux.siguiente = nuevo;
      nuevo.anterior = aux;
      nuevo.siguiente = this.primero;
      this.primero.anterior = nuevo;
    }
  }

  listar() {
    let lista = "";
    let aux = this.primero;
    while (aux.siguiente !== this.primero) {
      lista += aux.infoHTML();
      aux = aux.siguiente;
    }
    lista += aux.infoHTML();
    return lista;
  }

  buscar(nombre) {
    let aux = this.primero;
    while (aux !== null) {
      if (aux.nombre == nombre) return aux;
      aux = aux.siguiente;
    }
    return null;
  }

  eliminar(nombre) {
    if (this.primero === null) {
      return; // Caso 1: la lista está vacía
    }

    if (this.primero === this.primero.siguiente) {
      if (this.primero.nombre == nombre) {
        this.primero = null; // Caso 2: solo un bus en la lista
      }
      return;
    }

    let bus = this.buscar(nombre);
    if (bus == null) {
      return; // Caso 3: el bus buscado no se encontró
    }

    if (bus === this.primero) {
      this.primero = this.primero.siguiente; // Caso 4: bus a borrar es el primero
    }

    bus.anterior.siguiente = bus.siguiente; // Caso 5: bus en el medio, cambiamos enlaces
    bus.siguiente.anterior = bus.anterior;

    if (bus === this.primero.anterior) {
      this.primero.anterior = bus.anterior; // Caso 6: bus a borrar es el "último"
    }
  }
  //Si hay algún caso que me haya faltado, o hay alguno redundante, háganmelo saber en un commit :D
  listarInverso() {}
  agregarInicio() {}
  crearRuta(baseInicio, horaInicio, horaFin) {}
}
