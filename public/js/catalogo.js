let fichaLibroIdx;

function abrirCarrousel(idxLibro) {
    fichaLibroIdx = idxLibro;
    document.getElementById('carrousel-libros').style.display = "block";
    mostrarLibros();
}

function siguienteLibro(direccion) {
    fichaLibroIdx += direccion;
    mostrarLibros(fichaLibroIdx);
}

function mostrarLibros() {
    var libros = document.getElementsByClassName("carrousel");
    for (i = 0; i < libros.length; i++) {
        libros[i].style.display = "none";
    }
    if (fichaLibroIdx >= libros.length) {
        fichaLibroIdx = 0;
    }
    if (fichaLibroIdx < 0) {
        fichaLibroIdx = libros.length - 1;
    }
    libros[fichaLibroIdx].style.display = "block";
}