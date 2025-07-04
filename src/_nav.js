export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Animaux',
    to: '/animaux',
    icon: 'cil-paw',
  },
  {
    component: 'CNavItem',
    name: 'Clients',
    to: '/clients',
    icon: 'cil-user',
  },
  {
    component: 'CNavGroup',
    name: 'Paramétrage',
    icon: 'cil-settings',
    items: [
      {
        component: 'CNavItem',
        name: 'Gestion des utilisateurs',
        to: '/utilisateurs',
        icon: 'cil-user',
      },
      {
        component: 'CNavItem',
        name: 'Types d’animaux',
        to: '/parametrage/types-animaux',
        icon: 'cil-paw',
      },
      // Tu peux rajouter ici d'autres paramètres
    ],
  },
  {
    component: 'CNavItem',
    name: 'Calendrier',
    icon: 'cil-calendar',
    to: '/calendrier',
  },
  {
    component: 'CNavGroup',
    name: 'gestion des medicaments',
    icon: 'cil-storage',
    items: [
      {
        component: 'CNavItem',
        name: 'Médicaments',
        to: '/medicaments',
        icon: 'cil-medical-cross',
      },
      {
        component: 'CNavItem',
        name: 'Historique',
        to: '/medicaments/HistoriqueAchatVente',
        icon: 'cilHistory', // une icône simple et pro
      },
      {
        component: 'CNavItem',
        name: 'Alerte Stock',
        to: '/medicaments/StockAlerte',
        icon: 'cilWarning',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Gestion des Factures',
    icon: 'cil-money',
    items: [
      {
        component: 'CNavItem',
        name: 'Historique des factures',
        to: '/factures-clients',
      },
      {
        component: 'CNavItem',
        name: 'Créer Facture',
        to: '/factures/nouvelle',
      },
    ],
  },
];




