const form = document.getElementById("profesionForm");
const tabla = document.getElementById("tablaProfesiones");
const buscarInput = document.getElementById("buscar");

document.addEventListener("DOMContentLoaded", mostrarDatos);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    guardarDatos();
});

buscarInput.addEventListener("input", () => {
    const filtro = buscarInput.value.trim();
    mostrarDatos(filtro);
});

function guardarDatos() {
    const nombre = document.getElementById("nombre").value.trim();
    const profesion = document.getElementById("profesion").value.trim();
    const salario = document.getElementById("salario").value.trim();

    if (!nombre || !profesion || !salario) return;

    const nuevo = { nombre, profesion, salario: parseInt(salario) };

    let profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];
    profesiones.push(nuevo);
    localStorage.setItem("profesiones", JSON.stringify(profesiones));

    form.reset();
    mostrarDatos();
}

function mostrarDatos(filtro = "") {
    const profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];
    tabla.innerHTML = "";

    profesiones
        .filter((p) => {
            const filtroLower = filtro.toLowerCase();
            return (
                p.nombre.toLowerCase().includes(filtroLower) ||
                p.profesion.toLowerCase().includes(filtroLower) ||
                p.salario.toString().includes(filtroLower)
            );
        })
        .forEach((p, index) => {
            tabla.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${p.nombre}</td>
        <td>${p.profesion}</td>
        <td>${p.salario}</td>
        </tr>`;
        });
}
