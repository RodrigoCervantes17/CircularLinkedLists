class Bus {
  constructor(nombre, minutos) {
    this.siguiente = null;
    this.anterior = null;
    this.nombre = nombre;
    this.minutos = minutos;
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
  listar() {}
  buscar() {}
  eliminar() {}
  listarInverso() {}
  agregarInicio() {}
  crearRuta(baseInicio, horaInicio, horaFin) {}
}
