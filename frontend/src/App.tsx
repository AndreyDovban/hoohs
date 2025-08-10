import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

function App() {
	return (
		<>
			<h1>HELLO</h1>
			<button onClick={notify}>Make me a toast</button>
			<Toaster />
		</>
	);
}

export default App;
