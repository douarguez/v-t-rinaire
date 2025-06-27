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
    component: 'CNavGroup',
    name: 'Paramétrage',
    icon: 'cil-settings',
    items: [
      {
        component: 'CNavItem',
        name: 'Gestion des utilisateurs',
        to: '/parametrage/utilisateurs',
        icon: 'cil-user',
      },
      {
        component: 'CNavItem',
        name: 'Types d’animaux',
        to: '/parametrage/types-animaux',
        icon: 'cil-paw',
      }

      // Tu peux rajouter ici d'autres paramètres
    ],
  },
]
