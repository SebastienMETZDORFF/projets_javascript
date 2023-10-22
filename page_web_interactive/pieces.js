import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis, afficherGraphiqueAvis, afficherGraphiqueDisponibilitePieces } from "./avis.js"

// Récupération des pièces éventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem("pieces")
if (pieces === null) {
    // Récupération des pièces depuis l'API HTTP
    const reponse = await fetch("http://localhost:8081/pieces")
    pieces = await reponse.json()

    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces)

    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces)
} else {
    pieces = JSON.parse(pieces)
}

// on appelle la fonction pour ajouter le listener au formulaire
ajoutListenerEnvoyerAvis()

// Fonction qui génère toute la page web
function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i]
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches")
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article")
        pieceElement.dataset.id = article.id
        // On crée des balises HTML
        const imageElement = document.createElement("img")
        imageElement.src = article.image
        const nomElement = document.createElement("h2")
        nomElement.innerText = article.nom
        const prixElement = document.createElement("p")
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€" })`
        const categorieElement = document.createElement("p")
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)"
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment."
        const disponibiliteElement = document.createElement("p")
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"

        const avisBouton = document.createElement("button")
        avisBouton.dataset.id = article.id
        avisBouton.textContent = "Afficher les avis"
    
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement)
        // On rattache les balises à pieceElement (la balise article)
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement)
        pieceElement.appendChild(prixElement)
        pieceElement.appendChild(categorieElement)
        pieceElement.appendChild(descriptionElement)
        pieceElement.appendChild(disponibiliteElement)

        pieceElement.appendChild(avisBouton)
    }

    ajoutListenersAvis()
}

// Premier affichage de la page
genererPieces(pieces)

for (let i = 0; i < pieces.length; i++) {
    const id = pieces[i].id
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`)
    const avis = JSON.parse(avisJSON)

    if (avis !== null) {
        const pieceElement = document.querySelector(`article[data-id="${id}"]`)
        afficherAvis(pieceElement, avis)
    }
}

// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant")
boutonTrierCroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort((a, b) => a.prix - b.prix)
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonnees)
})

// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix")
boutonFiltrerPrix.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(piece => piece.prix <= 35)
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})

// Ajout du listener pour trier les pièces par ordre de prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant")
boutonTrierDecroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort((a, b) => b.prix - a.prix)
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonnees)
})

// Ajout du listener pour filtrer les pièces sans description
const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description")
boutonFiltrerDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(piece => piece.description)
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})

// On récupère les noms des pièces dont le prix est inférieur ou égal à 35€
const nomsAbordables = pieces.map(piece => piece.nom)
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        nomsAbordables.splice(i, 1)
    }
}

// Création de la liste des pièces abordables
const abordablesElements = document.createElement("ul")
// Ajout de chaque nom à la liste
for (let i = 0; i < nomsAbordables.length; i++) {
    const nomElement = document.createElement("li")
    nomElement.innerText = nomsAbordables[i]
    abordablesElements.appendChild(nomElement)
}
// Ajout de la liste à la div .abordables
document.querySelector(".abordables").appendChild(abordablesElements)

// On récupère les noms des pièces disponibles et leurs prix
const nomsDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix)
for (let i = pieces.length - 1; i >= 0; i--) {
    if (!pieces[i].disponibilite) {
        nomsDisponibles.splice(i, 1)
        prixDisponibles.splice(i, 1)
    }
}

// Création de la liste des pièces disponibles
const disponiblesElements = document.createElement("ul")
// Ajout de chaque nom à la liste
for (let i = 0; i < nomsDisponibles.length; i++) {
    const descriptionElement = document.createElement("li")
    descriptionElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €` 
    disponiblesElements.appendChild(descriptionElement)
}
// Ajout de la liste à la div .disponibles
document.querySelector(".disponibles").appendChild(disponiblesElements)

// // Ajout du listener pour filtrer les pièces selon le prix maximum
const inputPrixMax = document.getElementById("prix-max")
inputPrixMax.addEventListener("input", () => {
    const piecesFiltrees = pieces.filter(piece => piece.prix <= inputPrixMax.value)
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj")
boutonMettreAJour.addEventListener("click", () => {
    window.localStorage.removeItem("pieces")
})

await afficherGraphiqueAvis()
await afficherGraphiqueDisponibilitePieces()
