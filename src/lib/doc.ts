export type ID = number
export type WrappedID = { id: ID }

export type DocData = {
	title: string

	lists_by_id: { [key: ID]: ListData }
	lists_order: WrappedID[]

	stickies_by_id: { [key: ID]: StickyData }

	labels_by_id: { [key: ID]: LabelData }

	next_id: ID,
	// used_uuids: Set<UUID>
	// unused_uuids: UUID[]
}

export type ListData = {
	id: ID,
	title: string,

	sticky_uuids: WrappedID[],
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
