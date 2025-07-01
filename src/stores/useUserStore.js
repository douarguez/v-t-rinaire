import { ref } from 'vue'

const utilisateurs = ref([])

function addUser(user) {
  utilisateurs.value.push({ ...user, id: Date.now() })
}

function deleteUser(id) {
  utilisateurs.value = utilisateurs.value.filter(u => u.id !== id)
}

export function useUserStore() {
  return { utilisateurs, addUser, deleteUser }
}
