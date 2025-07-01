import { ref } from 'vue'

const roles = ref([{ id: 1, nom: 'Admin' }, { id: 2, nom: 'Vétérinaire' }])
function addRole(role) {
  roles.value.push({ ...role, id: Date.now() })
}
export function useRoleStore() {
  return { roles, addRole }
}
