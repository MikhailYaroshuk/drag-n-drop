import { useEffect, useRef, useState } from 'react'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
	const [text, setText] = useState('Add text')
	const dragTextRef = useRef<HTMLDivElement>(null)
	const dragImgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const dragTextArea = dragTextRef.current
		if (!dragTextArea) return

		const handleDragTextStart = (event: DragEvent) => {
			event.dataTransfer?.setData('text/plain', text)
		}

		dragTextArea.addEventListener('dragstart', handleDragTextStart)

		return () => {
			dragTextArea.removeEventListener('dragstart', handleDragTextStart)
		}
	}, [text])

	useEffect(() => {
		const dragImg = dragImgRef.current
		if (!dragImg) return

		const handleDragImgStart = (event: DragEvent) => {
			event.dataTransfer?.setData('text/plain', 'image')
		}

		dragImg.addEventListener('dragstart', handleDragImgStart)

		return () => {
			dragImg.removeEventListener('dragstart', handleDragImgStart)
		}
	}, [])

	return (
		<div style={{ border: '1px solid black', width: '300px' }}>
			<div ref={dragTextRef} style={{ cursor: 'grab' }} draggable='true'>
				<h1 style={{ textAlign: 'center' }}>{text}</h1>
			</div>
			<img
				ref={dragImgRef}
				src='https://via.placeholder.com/150x150'
				alt='example'
				style={{ width: '150px', height: '150px', cursor: 'grab' }}
			/>
		</div>
	)
}

export default Sidebar
