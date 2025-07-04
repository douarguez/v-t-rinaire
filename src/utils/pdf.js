import jsPDF from 'jspdf'

export function genererFacturePDF(facture) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Facture', 10, 10)

  doc.setFontSize(12)
  doc.text(`Numéro : ${facture.numero}`, 10, 20)
  doc.text(`Client : ${facture.client}`, 10, 30)
  doc.text(`Date : ${facture.date}`, 10, 40)
  doc.text(`Montant total : ${facture.total} TND`, 10, 50)
  doc.text(`Statut : ${facture.statut}`, 10, 60)

  doc.save(`facture-${facture.numero}.pdf`)
}
