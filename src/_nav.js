export default [
  {
    component: 'CNavItem',
    name: 'Tableau de bord',
    to: '/dashboard',
    icon: 'cil-speedometer',
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
    component: 'CNavItem',
    name: 'Interventions',
    to: '/interventions',
    icon: 'cil-notes',
  },
  {
    component: 'CNavItem',
    name: 'Calendrier',
    to: '/calendrier',
    icon: 'cil-calendar',
  },
  {
    component: 'CNavGroup',
    name: 'Médicaments',
    icon: 'cil-medical-cross',
    items: [
      {
        component: 'CNavItem',
        name: 'Liste des médicaments',
        to: '/medicaments',
      },
      {
        component: 'CNavItem',
        name: 'Historique achats/ventes',
        to: '/medicaments/historique',
      },
      {
        component: 'CNavItem',
        name: 'Alertes de stock',
        to: '/medicaments/alerte-stock',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Facturation',
    icon: 'cil-money',
    items: [
      {
        component: 'CNavItem',
        name: 'Historique',
        to: '/factures',
      },
      {
        component: 'CNavItem',
        name: 'Nouvelle facture',
        to: '/factures/nouvelle',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Paramètres',
    icon: 'cil-settings',
    items: [
      {
        component: 'CNavItem',
        name: 'Utilisateurs',
        to: '/utilisateurs',
      },
      {
        component: 'CNavItem',
        name: 'Types d’animaux',
        to: '/parametrage/types-animaux',
      },
      {
        component: 'CNavItem',
        name: 'Types d’intervention',
        to: '/parametrage/types-interventions',
      },
    ],
  },
]
