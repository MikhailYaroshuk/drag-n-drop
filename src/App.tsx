import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

const App: React.FC = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Sidebar />
			<WorkArea onImageClick={() => {}} />
		</div>
	)
}

export default App
