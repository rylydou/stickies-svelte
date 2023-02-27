import { SyncedText } from '@syncedstore/core'

export function create_doc(): DocData {
	var doc = {} as DocData
	init_doc(doc)
	return doc
}

export function init_doc(doc: DocData): void {
	doc.title = ''
	doc.labels = {}
	doc.stickies = {}
	doc.lists = {}
	doc.lists_order = []
}

export type DocData = {
	title: string

	lists: { [key: string]: ListData }
	lists_order: string[]

	stickies: { [key: string]: StickyData }

	labels: { [key: string]: LabelData }
}

export type ListData = {
	id: string,
	title: string,

	stickies: string[],
}

export type StickyData = {
	id: string,
	title: string,
	description: SyncedText,
	labels: string[],

	parts: Part[],
}

export type LabelData = {
	id: string,
	name: string,
	color: string,
}

export type Part = {
	type: string
}

export type ChecklistPart = Part & {
	type: 'checklist'
	title: string,
	items: ChecklistPartItem[],
}

export type ChecklistPartItem = {
	title: string,
	completed: boolean,
}

export type LinkPart = {
	type: 'link'
	title: string,
	href: string,
}
