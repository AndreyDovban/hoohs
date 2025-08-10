import { type DetailedHTMLProps, type HTMLAttributes } from 'react';
import toast, { Toaster, type ToastOptions } from 'react-hot-toast';
import { useQuery } from '../../hooks/useQuery';

const options: ToastOptions = {
	position: 'top-right',
	removeDelay: 2000,
};

interface ToastWithApiExampleProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	className?: string;
}

export function QueryTestExamle({ className, ...props }: ToastWithApiExampleProps) {
	const user = useQuery<string>('/api/user');
	const side_user = useQuery<string>('/api/user');
	// const product = useQuery<string>('/api/product');

	if (user.loading) {
		return <p>LOADING...</p>;
	}

	if (user.error) {
		toast.error(user.error.message, options);
		return <p>{user.error.message}</p>;
	}

	// if (product.error) {
	// 	toast.error(product.error.message, options);
	// }

	function postUser() {
		side_user.get('/api/user');
	}

	if (user.data) {
		toast.success(user.data, options);
		return (
			<section className={className} {...props}>
				<h1>HELLO</h1>
				<button onClick={postUser}>Make me a toast</button>
				<Toaster />
			</section>
		);
	}

	return null;
}
