/*Función que abre el submenu*/
function abrirSubmenu() {
    document.getElementById("nav_submenu").style.display = "block";
    document.getElementById("cerrar-submenu").style.display = "unset";
    document.getElementById("abrir-submenu").style.display = "none";
}

/*Función que cierra el submenú*/
function cerrarSubmenu() {
    document.getElementById("submenu-barra").style.display = "none";
    document.getElementById("cerrar-submenu").style.display = "none";
    document.getElementById("abrir-submenu").style.display = "unset";
}

function toggleSubmenu() {
    const submenuDisplay = document.getElementById("nav_submenu").style.display;
    if (submenuDisplay === 'block') {
        document.getElementById("nav_submenu").style.display = 'none';
    } else {
        document.getElementById("nav_submenu").style.display = 'block';
    }
}