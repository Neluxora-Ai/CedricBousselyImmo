// ======================================
// CEDRIC IMMO
// script.js
// ======================================

const grid = document.getElementById("maisons-grid");

const modal = document.getElementById("propertyModal");

let currentProperty = null;
let currentImage = 0;

// ======================================
// Génération des cartes
// ======================================

function afficherBiens(liste = biens){

    grid.innerHTML = "";

    liste.forEach((bien)=>{

        const card = document.createElement("div");

        card.className = "maison-card";

        card.innerHTML = `

            <div class="maison-img">

                <img src="${bien.images[0]}">

                <span class="tag">

                    ${bien.type.toUpperCase()}

                </span>

            </div>

            <div class="maison-body">

                <div class="maison-title">

                    ${bien.titre}

                </div>

                <div class="maison-ville">

                    📍 ${bien.ville}

                </div>

                <div class="maison-features">

                    <span>

                        🛏 ${bien.pieces} pièces

                    </span>

                    <span>

                        📐 ${bien.surface} m²

                    </span>

                </div>

                <div class="maison-price">

                    ${Number(bien.prix).toLocaleString("fr-FR")} €

                </div>

            </div>

        `;

        card.onclick = () => ouvrirBien(bien.id);

        grid.appendChild(card);

    });

}

afficherBiens();
// ======================================
// Ouverture de la fiche
// ======================================

function ouvrirBien(id){

    currentProperty = biens.find(b => b.id === id);

    currentImage = 0;

    afficherModal();

}

// ======================================

function afficherModal(){

    modal.style.display = "flex";

    modal.innerHTML = `

<div class="modal-content">

    <span class="close-modal">&times;</span>

    <div class="gallery">

        <button class="gallery-btn left">

            &#10094;

        </button>

        <img id="main-image"

             src="${currentProperty.images[currentImage]}">

        <button class="gallery-btn right">

            &#10095;

        </button>

    </div>

    <div class="thumbnails">

        ${currentProperty.images.map((img,index)=>`

            <img

                src="${img}"

                data-index="${index}"

                class="thumb"

            >

        `).join("")}

    </div>

    <div class="property-content">

        <h2>

            ${currentProperty.titre}

        </h2>

        <div class="property-price">

            ${Number(currentProperty.prix).toLocaleString("fr-FR")} €

        </div>

        <div class="property-info">

            <span>

                📍 ${currentProperty.ville}

            </span>

            <span>

                📐 ${currentProperty.surface} m²

            </span>

            <span>

                🛏 ${currentProperty.pieces} pièces

            </span>

            <span>

                🌳 Terrain : ${currentProperty.terrain}

            </span>

        </div>

        <p>

            ${currentProperty.description}

        </p>

        <div class="modal-buttons">

            <button class="contact-btn">

                📞 Contacter

            </button>

            <button class="visit-btn">

                📅 Demander une visite

            </button>

        </div>

    </div>

</div>

`;

    gestionModal();

}

// ======================================
// Gestion de la fenêtre
// ======================================

function gestionModal(){

    const image = document.getElementById("main-image");

    const left = document.querySelector(".left");

    const right = document.querySelector(".right");

    const close = document.querySelector(".close-modal");

    const thumbs = document.querySelectorAll(".thumb");

    // ==========================
    // Flèche gauche
    // ==========================

    left.onclick = () => {

        currentImage--;

        if(currentImage < 0){

            currentImage = currentProperty.images.length - 1;

        }

        image.src = currentProperty.images[currentImage];

        mettreMiniatureActive();

    };

    // ==========================
    // Flèche droite
    // ==========================

    right.onclick = () => {

        currentImage++;

        if(currentImage >= currentProperty.images.length){

            currentImage = 0;

        }

        image.src = currentProperty.images[currentImage];

        mettreMiniatureActive();

    };

    // ==========================
    // Miniatures
    // ==========================

    thumbs.forEach((thumb)=>{

        thumb.onclick = () => {

            currentImage = Number(thumb.dataset.index);

            image.src = currentProperty.images[currentImage];

            mettreMiniatureActive();

        };

    });

    // ==========================
    // Fermeture
    // ==========================

    close.onclick = fermerModal;

}

// ======================================
// Fermeture
// ======================================

function fermerModal(){

    modal.style.display = "none";

}

// ==========================
// Clic en dehors
// ==========================

window.addEventListener("click",(e)=>{

    if(e.target === modal){

        fermerModal();

    }

});

// ==========================
// Touche Echap
// ==========================

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        fermerModal();

    }

});

// ======================================
// Miniature active
// ======================================

function mettreMiniatureActive(){

    const thumbs = document.querySelectorAll(".thumb");

    thumbs.forEach((thumb,index)=>{

        if(index === currentImage){

            thumb.style.border = "4px solid #2a8fd4";

            thumb.style.opacity = "1";

        }

        else{

            thumb.style.border = "none";

            thumb.style.opacity = ".6";

        }

    });

}

// ======================================
// RECHERCHE ET FILTRES
// ======================================

// Recherche
const recherche = document.getElementById("search");

if (recherche) {

    recherche.addEventListener("input", () => {

        filtrerBiens();

    });

}

// Type (vente/location)
const filtreType = document.getElementById("filtre-type");

if (filtreType) {

    filtreType.addEventListener("change", () => {

        filtrerBiens();

    });

}

// Prix maximum
const filtrePrix = document.getElementById("filtre-prix");

if (filtrePrix) {

    filtrePrix.addEventListener("input", () => {

        filtrerBiens();

    });

}

// Surface minimum
const filtreSurface = document.getElementById("filtre-surface");

if (filtreSurface) {

    filtreSurface.addEventListener("input", () => {

        filtrerBiens();

    });

}

// Pièces minimum
const filtrePieces = document.getElementById("filtre-pieces");

if (filtrePieces) {

    filtrePieces.addEventListener("input", () => {

        filtrerBiens();

    });

}

function filtrerBiens(){

    let resultat = [...biens];

    // Recherche texte

    if(recherche && recherche.value !== ""){

        const texte = recherche.value.toLowerCase();

        resultat = resultat.filter(bien =>

            bien.titre.toLowerCase().includes(texte) ||

            bien.ville.toLowerCase().includes(texte)

        );

    }

    // Vente / Location

    if(filtreType && filtreType.value !== "tous"){

        resultat = resultat.filter(bien =>

            bien.type === filtreType.value

        );

    }

    // Prix

    if(filtrePrix && filtrePrix.value !== ""){

        resultat = resultat.filter(bien =>

            bien.prix <= Number(filtrePrix.value)

        );

    }

    // Surface

    if(filtreSurface && filtreSurface.value !== ""){

        resultat = resultat.filter(bien =>

            bien.surface >= Number(filtreSurface.value)

        );

    }

    // Pièces

    if(filtrePieces && filtrePieces.value !== ""){

        resultat = resultat.filter(bien =>

            bien.pieces >= Number(filtrePieces.value)

        );

    }

    afficherBiens(resultat);

}

// ======================================
// FAVORIS (Préparation)
// ======================================

let favoris = [];

function ajouterFavori(id){

    if(!favoris.includes(id)){

        favoris.push(id);

    }

    localStorage.setItem(

        "favoris",

        JSON.stringify(favoris)

    );

}

function chargerFavoris(){

    const sauvegarde = localStorage.getItem("favoris");

    if(sauvegarde){

        favoris = JSON.parse(sauvegarde);

    }

}

chargerFavoris();


// ======================================
// Initialisation
// ======================================

window.addEventListener("load",()=>{

    afficherBiens();

});
const btnRecherche = document.getElementById("btnRecherche");

if (btnRecherche) {
    btnRecherche.addEventListener("click", () => {
        filtrerBiens();
    });
}
