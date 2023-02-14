import { getYjsValue, syncedStore } from "@syncedstore/core"
import type { DocData } from '../lib/doc'
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'

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

websocket_provider.on('status', e => {
	console.log('websocket-sync', e.status)
})
