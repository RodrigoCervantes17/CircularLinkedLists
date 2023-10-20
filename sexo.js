class Base {
  constructor(nombre, minutos) {
    this.siguiente = null;
    this.anterior = null;
    this.nombre = nombre;
    this.minutos = minutos;
  }
  infoHTML() {
    return `
        <div class="base">
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
    let inicial = aux;
  
    while (aux !== null) {
      if (aux.nombre == nombre) return aux;
      aux = aux.siguiente;
      if (aux === inicial) break;
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

    let base = this.buscar(nombre);
    if (base == null) {
      return; // Caso 3: el bus buscado no se encontró
    }

    if (base == this.primero) {
      this.primero = this.primero.siguiente; // Caso 4: bus a borrar es el primero
    }

    base.anterior.siguiente = base.siguiente; // Caso 5: bus en el medio, cambiamos enlaces
    base.siguiente.anterior = base.anterior;

    if (base === this.primero.anterior) {
      this.primero.anterior = base.anterior; // Caso 6: bus a borrar es el "último"
    }
  }
  //Si hay algún caso que me haya faltado, o hay alguno redundante, háganmelo saber en un commit :D
  listarInverso() {
    let aux = this.primero;
    let listaInversa = "";
    while (aux.anterior !== this.primero) {
      listaInversa += aux.infoHTML();
      aux = aux.anterior;
    }
    listaInversa += aux.infoHTML();
    return listaInversa;
  }

  agregarInicio(nuevo) {
    if (this.primero != null) {
      let aux = this.primero.anterior;
      nuevo.siguiente = this.primero;
      nuevo.anterior = aux;
      this.primero.anterior = nuevo;
      aux.siguiente = nuevo;
      this.primero = nuevo;
    } else {
      this.primero = nuevo;
      this.primero.anterior = nuevo;
      this.primero.siguiente = nuevo;
    }
  }

  crearRuta(baseInicio, horaInicio, horaFin) {
    if (baseInicio == null || horaInicio < 0 || horaFin <= horaInicio) {
      return "Parámetros inválidos";
    }

    let rutaActual = baseInicio;
    let horaActual = horaInicio;
    let minutos = 0;
    let rutaRecorrida = "";

    while (horaActual < horaFin || (horaActual == horaFin && minutos == 0)) {
      let horaStr = horaActual < 10 ? `0${horaActual}` : horaActual;
      let minutosStr = minutos < 10 ? `0${minutos}` : minutos;

      rutaRecorrida += `Hora: ${horaStr}:${minutosStr} - Base: ${rutaActual.nombre}\n `;

      minutos += rutaActual.siguiente.minutos;
      while (minutos >= 60) {
        horaActual++;
        minutos -= 60;
      }
      rutaActual = rutaActual.siguiente;
      if (rutaActual === this.primero) {
        rutaActual = this.primero;
      }
    }

    return rutaRecorrida;
  }
}

/* 
let rutaNueva = new Ruta
let ruta14 = new Base("14",60)
let ruta15 = new Base("15",40)
let ruta16 = new Base("16",35)
rutaNueva.agregar(ruta14)
rutaNueva.agregar(ruta15)
rutaNueva.agregar(ruta16)

*/
