import { createPinia } from 'pinia'
import { useAppStore } from '@/pinia/modules/app'
import { useUserStore } from '@/pinia/modules/user'
import { useDictionaryStore } from '@/pinia/modules/dictionary'
import { useLoginStore } from '@/pinia/modules/login'

const store = createPinia()

export {
  store,
  useAppStore,
  useUserStore,
  useDictionaryStore,
  useLoginStore
}
