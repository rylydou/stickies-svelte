import { getYjsValue, syncedStore } from "@syncedstore/core"
import { svelteSyncedStore } from "@syncedstore/svelte"
import { writable } from 'svelte/store'
import { Doc } from 'yjs'
import type { DocData } from '../doc'

export const doc_store_generic = syncedStore({
	doc: {} as DocData
})
export const doc_store = svelteSyncedStore(doc_store_generic)

export const y_doc = getYjsValue(doc_store_generic) as Doc

export const selected_sticky = writable(null as null | string)
