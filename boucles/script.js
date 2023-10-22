const listeMots = ["Cachalot", "Pétunia", "Serviette"]
const listePhrases = ["Pas de panique !", "La vie, l'univers et le reste", "Merci pour le poisson"]
let score = 0

let choixUtilisateur = ""
while (choixUtilisateur !== "mots" && choixUtilisateur !== "phrases") {
    choixUtilisateur = prompt("Voulez vous la liste de mots (tapez \"mots\") ou la liste de phrases (tapez \"phrases\") ?")
}

if (choixUtilisateur === "mots") {
    for (let i = 0; i < listeMots.length ; i++) {
        let motUtilisateur = prompt("Entrez le mot : " + listeMots[i])
        if (motUtilisateur === listeMots[i]) {
            score++
        }
    }

    console.log("Votre score est de " + score + " sur " + listeMots.length)
} else {
    for (let i = 0; i < listePhrases.length ; i++) {
        let phraseUtilisateur = prompt("Entrez la phrase : " + listePhrases[i])
        if (phraseUtilisateur === listePhrases[i]) {
            score++
        }
    }

    console.log("Votre score est de " + score + " sur " + listePhrases.length)
}
