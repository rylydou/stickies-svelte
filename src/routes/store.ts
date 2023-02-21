import { getYjsValue, syncedStore } from "@syncedstore/core"
import type { DocData } from '../lib/doc'
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'

export const doc_store = syncedStore({
	doc: {} as DocData
})

export const doc_store_sync = getYjsValue(doc_store) as Doc

export let websocket_provider = new WebsocketProvider(
	'ws://localhost:1234',
	'test_room',
	doc_store_sync,
	{ connect: false, }
)

export let indexdb_provider = new IndexeddbPersistence(
	'test_room',
	doc_store_sync,
)

websocket_provider.on('status', e => {
	console.log('websocket-sync', e.status)
})
