import Swal from 'sweetalert2';

export async function successAlert(title: string, text: string) {
	const style_swalBg = ' bg-light dark:bg-dark text-pd-primary';

	await Swal.fire({
		title,
		text,
		icon: 'success',
		iconColor: '#10B981',
		confirmButtonText: 'Ok',
		confirmButtonColor: '#10B981',
		customClass: {
			popup: style_swalBg,
		},
	});
}

export async function errorAlert(title: string, text: string) {
	const style_swalBg = ' bg-light dark:bg-dark text-pd-primary';

	await Swal.fire({
		title,
		text,
		icon: 'error',
		iconColor: '#EF4444',
		confirmButtonText: 'Ok',
		confirmButtonColor: '#EF4444',
		customClass: {
			popup: style_swalBg,
		},
	});
}
