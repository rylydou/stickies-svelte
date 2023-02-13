import { syncedStore } from "@syncedstore/core"
import type { DocData } from '../lib/doc'

export const globalStore = syncedStore({
	doc: {} as DocData
})
