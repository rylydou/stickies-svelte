import { Colord } from 'colord'

export type ID = number

export type DocData = {
	title: string

	lists: { [key: ID]: ListData }
	lists_order: ID[]

	stickies: { [key: ID]: StickyData }

	labels: { [key: ID]: LabelData }

	next_id: ID,
	// used_uuids: Set<UUID>
	// unused_uuids: UUID[]
}

export type ListData = {
	id: ID,
	title: string,

	stickies: ID[],
}

export type StickyData = {
	id: ID,
	title: string,
	description: string,
	labels: ID[],

	parts: Part[],
}

export type LabelData = {
	id: ID,
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
