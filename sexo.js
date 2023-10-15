
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
          this.primero.siguiente = this.primero // Este pedo pa hacerlo circular
          this.primero.anterior = this.primero
      }else { 
          aux = this.primero
          while(aux.siguiente !== this.primero){
              aux = aux.siguiente
          }
      aux.siguiente = nuevo;
      nuevo.anterior = aux;
      nuevo.siguiente = this.primero;
      this.primero.anterior = nuevo;
      }
    }
    listar() {
      let lista=""
      let aux = this.primero
      while(aux.siguiente!==this.primero){
        lista += aux.infoHTML()
        aux=aux.siguiente
      }
      lista += aux.infoHTML();
      return lista;

    }
    buscar(nombre) {
      let aux = this.primero
      while (aux !== null){
        if (aux.nombre == nombre) return aux
        aux = aux.siguiente
      }
      return null;
    }
    eliminar() {}
    listarInverso() {}
    agregarInicio() {}
    crearRuta(baseInicio, horaInicio, horaFin) {}
  }
