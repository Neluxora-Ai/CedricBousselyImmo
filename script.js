// ======================================================
// CEDRIC IMMO
// script.js
// ======================================================

const grid = document.getElementById("maisons-grid");
const modal = document.getElementById("propertyModal");

let currentProperty = null;
let currentImage = 0;

// ======================================================
// AFFICHAGE DES BIENS
// ======================================================

function afficherBiens(liste = biens) {

    grid.innerHTML = "";

    liste.forEach(bien => {

        const card = document.createElement("div");

        card.className = "maison-card";

        card.innerHTML = `
            <div class="maison-img">
                <img src="${bien.images[0]}" alt="${bien.titre}">
                <span class="tag">${bien.type}</span>
            </div>

            <div class="maison-body">

                <h3 class="maison-title">${bien.titre}</h3>

                <div class="maison-ville">
                    📍 ${bien.ville}
                </div>

                <div class="maison-features">
                    <span>🛏 ${bien.pieces} pièces</span>
                    <span>📐 ${bien.surface} m²</span>
                </div>

                <div class="maison-price">
                    ${bien.prix.toLocaleString("fr-FR")} €
                </div>

            </div>
        `;

        card.addEventListener("click", () => ouvrirBien(bien.id));

        grid.appendChild(card);

    });

}

// ======================================================
// INITIALISATION
// ======================================================

window.addEventListener("DOMContentLoaded", () => {

    afficherBiens();

});

// ======================================================
// OUVERTURE DE LA POPUP
// ======================================================

function ouvrirBien(id) {

    currentProperty = biens.find(b => b.id === id);

    if (!currentProperty) return;

    modal.innerHTML = `

        <div class="modal-content">

            <span class="close-modal">&times;</span>

            <img
                class="modal-image"
                src="${currentProperty.images[0]}"
                alt="${currentProperty.titre}">

            <div class="property-content">

                <h2>${currentProperty.titre}</h2>

                <div class="property-price">
                    ${currentProperty.prix.toLocaleString("fr-FR")} €
                </div>

                <p><strong>📍 Ville :</strong> ${currentProperty.ville}</p>

                <p><strong>📐 Surface :</strong> ${currentProperty.surface} m²</p>

                <p><strong>🛏 Pièces :</strong> ${currentProperty.pieces}</p>

                <p><strong>🌳 Terrain :</strong> ${currentProperty.terrain}</p>

                <p style="margin-top:20px;">
                    ${currentProperty.description}
                </p>

            </div>

        </div>

    `;

    modal.style.display = "flex";

    document
        .querySelector(".close-modal")
        .addEventListener("click", fermerModal);

}

// ======================================================
// FERMETURE
// ======================================================

function fermerModal() {

    modal.style.display = "none";

}

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        fermerModal();

    }

});
