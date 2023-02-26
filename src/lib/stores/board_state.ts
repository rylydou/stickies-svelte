import { getYjsValue, syncedStore } from "@syncedstore/core"
import { writable } from 'svelte/store'
import { Doc } from 'yjs'
import type { DocData, ID } from '../doc'

export const doc_store = syncedStore({
	doc: {} as DocData
})

export const y_doc = getYjsValue(doc_store) as Doc

export const selected_sticky = writable(0 as ID)
