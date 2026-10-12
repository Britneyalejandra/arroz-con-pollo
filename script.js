
const formulario = document.getElementById("formulario-recetas");
const campoBusqueda = document.getElementById("busqueda-recetas");
const resultados = document.getElementById("resultados-recetas");
const mensaje = document.getElementById("mensaje-recetas");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const busqueda = campoBusqueda.value.trim();

    if (busqueda === "") {
        mensaje.textContent = "Escribe el nombre de una receta.";
        return;
    }

    mensaje.textContent = "Buscando recetas...";
    resultados.innerHTML = "";

    try {
        const respuesta = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(busqueda)}`
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo consultar la API.");
        }

        const datos = await respuesta.json();
        const recetas = datos.meals;

        if (!recetas) {
            mensaje.textContent = "No encontramos recetas. Prueba con otro nombre.";
            return;
        }

        mensaje.textContent = `Encontramos ${recetas.length} receta(s).`;

        recetas.forEach((receta) => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta-receta");

            tarjeta.innerHTML = `
                <img src="${receta.strMealThumb}"
                     alt="${receta.strMeal}">
                <h3>${receta.strMeal}</h3>
                <p>Tipo de comida: ${receta.strArea || "No especificado"}</p>
                <a href="${receta.strSource || receta.strYoutube || "#"}"
                   target="_blank" rel="noopener noreferrer">
                    Ver receta
                </a>
            `;

            resultados.appendChild(tarjeta);
        });
    } catch (error) {
        mensaje.textContent =
            "Ocurrió un error al consultar las recetas. Inténtalo de nuevo.";
        console.error(error);
    }
});
