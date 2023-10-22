/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    let spanScore = document.querySelector(".zoneScore span")
    spanScore.innerHTML = `${score} / ${nbMotsProposes}`
}

/**
 * Cette fonction affiche la proposition dans la div zoneProposition
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerHTML = proposition
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    let score = 0
    let listePropositions = listeMots;

    // On récupère la balise inputEcriture
    let inputEcriture = document.getElementById("inputEcriture")

    // On récupère le bouton de validation
    let btnValiderMot = document.getElementById("btnValiderMot")

    // On récupère les boutons radio
    let listeBtnRadio = document.querySelectorAll(".optionSource input")

    let i = 0
    afficherProposition(listePropositions[0])

    // On écoute l'événement click sur le bouton
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listePropositions[i]) {
            score++
        }

        inputEcriture.value = ""

        i++
        afficherResultat(score, i)
        if (listePropositions[i] === undefined) {
            afficherProposition("Le jeu est fini !")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listePropositions[i])
        }
    })

    // On écoute l'événement change sur les boutons radio
    for (let j = 0; j < listeBtnRadio.length; j++) {
        listeBtnRadio[j].addEventListener("change", () => {
            // On modifie le texte en fonction du bouton radio sélectionné
            if (listeBtnRadio[j].value === "1") {
                listePropositions = listeMots
            } else {
                listePropositions = listePhrases
            }
            
            afficherProposition(listePropositions[i])
        })
    }
}