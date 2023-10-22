/*********************************************************************************
 * 
 * Point d'entrée, c'est lui qui intialise le jeu et lance la boucle de jeu. 
 * 
 *********************************************************************************/

// Ici, j'ai mis la fonction lancerJeu() en commentaire pour ne pas être dérangé par l'affichage des popups.
// lancerJeu()

// Je sélectionne des balises HTML

// Avec la méthode getElementById
let inputEcriture = document.getElementById("inputEcriture")
console.log(inputEcriture)
let boutonValider = document.getElementById("btnValiderMot")
console.log(boutonValider)

// Avec la méthode querySelector
let zoneProposition = document.querySelector(".zoneProposition")
console.log(zoneProposition)
let spanScore = document.querySelector(".zoneScore span")
console.log(spanScore)

// Avec la méthode querySelectorAll
let boutonsRadioChoix = document.querySelectorAll(".optionSource input")
console.log(boutonsRadioChoix)
