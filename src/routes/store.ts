import { getYjsValue, syncedStore } from "@syncedstore/core"
import { onMount } from 'svelte'
import { WebsocketProvider } from "y-websocket"

export type Todo = {
	title: string
	completed: boolean
}

export const globalStore = syncedStore({ todos: [] as Todo[] })
