import { writable } from 'svelte/store'
import type { ID } from '../lib/doc'

export const selected_sticky = writable(0 as ID)
