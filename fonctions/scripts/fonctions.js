// Cette fonction affiche le score de l'utilisateur
function afficherResultat(resultat, nombreMotsProposes) {
    console.log("Votre score est de " + resultat + " sur " + nombreMotsProposes)
}

// Cette fonction demande à l'utilisateur s'il veut saisir des phrases ou des mots
// et retourne ce qu'il a tapé
function choisirPhrasesOuMots() {
    let choixUtilisateur = ""
    while (choixUtilisateur !== "mots" && choixUtilisateur !== "phrases") {
        choixUtilisateur = prompt("Voulez vous la liste de mots (tapez \"mots\") ou la liste de phrases (tapez \"phrases\") ?")
    }

    return choixUtilisateur
}

// Cette fonction demande au joueur de taper les mots ou les phrases de la liste passée en paramètre
// et retourne le nombre de mots/phrases correctement tapés
function lancerBoucleDeJeu(liste) {
    let score = 0

    for (let i = 0; i < liste.length ; i++) {
        let chaineUtilisateur = prompt("Entrez la chaîne de caractères : " + liste[i])
        if (chaineUtilisateur === liste[i]) {
            score++
        }
    }

    return score
}

// Cette fonction démarre le jeu
function lancerJeu() {
    let score = 0
    let nombreMotsProposes = 0
    let choixUtilisateur = choisirPhrasesOuMots();
    
    if (choixUtilisateur === "mots") {
        score = lancerBoucleDeJeu(listeMots)
        nombreMotsProposes = listeMots.length
    } else {
        score = lancerBoucleDeJeu(listePhrases)
        nombreMotsProposes = listePhrases.length
    }

    afficherResultat(score, nombreMotsProposes)
}
