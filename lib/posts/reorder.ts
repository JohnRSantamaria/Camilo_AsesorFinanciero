import {createClient} from '@/lib/supabase/client';

type Sortable = {
	id: string;
	sort_order: number;
};

type SortTable = 'posts' | 'products';

export async function swapSortOrder(
	a: Sortable,
	b: Sortable,
	table: SortTable = 'posts'
) {
	const supabase = createClient();

	const {error: errorA} = await supabase
		.from(table)
		.update({sort_order: b.sort_order})
		.eq('id', a.id);

	if (errorA) {
		return {error: errorA.message};
	}

	const {error: errorB} = await supabase
		.from(table)
		.update({sort_order: a.sort_order})
		.eq('id', b.id);

	if (errorB) {
		await supabase.from(table).update({sort_order: a.sort_order}).eq('id', a.id);
		return {error: errorB.message};
	}

	return {error: null};
}

export async function nextSortOrder(table: SortTable = 'posts'): Promise<number> {
	const supabase = createClient();
	const {data} = await supabase
		.from(table)
		.select('sort_order')
		.order('sort_order', {ascending: false})
		.limit(1)
		.maybeSingle();

	return (data?.sort_order ?? 0) + 1;
}
