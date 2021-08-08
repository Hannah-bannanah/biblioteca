var idxLibro = 0;

function abrirCarrousel() {
    idxLibro = 0;
    document.getElementById('carrousel-libros').style.display="block";
    mostrarLibros();
}

function cerrarParent(elementId) {
    document.getElementById(elementId).parentNode.style.display="none";
}


function siguienteLibro(direccion) {
    idxLibro += direccion;
    mostrarLibros();
}

function mostrarLibros(){
    var libros = document.getElementsByClassName("carrousel");
    for (i=0; i<libros.length; i++){
        libros[i].style.display="none";
    }
    if (idxLibro >= libros.length){idxLibro = 0;}
    if (idxLibro < 0) {idxLibro = libros.length - 1;}
    libros[idxLibro].style.display = "block";
}
