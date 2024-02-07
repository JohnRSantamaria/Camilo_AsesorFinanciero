import Swal from 'sweetalert2';

export async function successAlert(title: string, text: string) {
	const style_swalBg = ' bg-light dark:bg-dark text-pd-primary';

	await Swal.fire({
		title,
		text,
		icon: 'success',
		confirmButtonText: 'Ok',
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
		confirmButtonText: 'Ok',
		customClass: {
			popup: style_swalBg,
		},
	});
}
