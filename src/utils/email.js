export function envoyerFactureEmail(facture) {
  console.log('Envoi de la facture par email...')
  console.log('Facture :', facture)

  // 🔁 Ici tu peux utiliser EmailJS ou un backend plus tard
  alert(`Email envoyé à ${facture.client} avec la facture numéro ${facture.numero}`)
}

