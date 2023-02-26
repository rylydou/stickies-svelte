
export async function load({ params }): Promise<{ doc_id: string }> {
	const doc_id = params.doc_id
	return { doc_id }
}
