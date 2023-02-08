import { useState, useRef, useEffect } from 'react'

import Image from './Image'

interface WorkAreaProps {
	onImageClick: (event: React.MouseEvent<HTMLImageElement>) => void
}

const WorkArea: React.FC<WorkAreaProps> = ({ onImageClick }) => {
	const [inputs, setInputs] = useState<string[]>([])
	const dropRef = useRef<HTMLDivElement>(null)
	const [images, setImages] = useState<string[]>([])

	const handleImageClick = (
		event: React.MouseEvent<HTMLImageElement>,
		index: number
	) => {
		event.preventDefault()
		const input = document.createElement('input')
		input.type = 'file'
		input.onchange = e => {
			const file = (e.target as HTMLInputElement).files![0]
			const reader = new FileReader()
			reader.onload = e => {
				setImages(prevImages => {
					const newImages = [...prevImages]
					newImages[index] = e.target!.result as string
					return newImages
				})
			}
			reader.readAsDataURL(file)
		}
		input.click()
	}

	useEffect(() => {
		const dropArea = dropRef.current
		if (!dropArea) return

		const handleDrop = (event: DragEvent) => {
			event.preventDefault()
			const input = event.dataTransfer?.getData('text/plain')
			if (input === 'image') {
				setImages([...images, 'https://via.placeholder.com/150x150'])
			} else {
				setInputs([...inputs, input || ''])
			}
		}
		dropArea.addEventListener('drop', handleDrop)
		return () => {
			dropArea.removeEventListener('drop', handleDrop)
		}
	}, [inputs, images])

	useEffect(() => {
		const dropArea = dropRef.current
		if (!dropArea) return
		const handleDragOver = (event: DragEvent) => {
			event.preventDefault()
		}

		dropArea.addEventListener('dragover', handleDragOver)

		return () => {
			dropArea.removeEventListener('dragover', handleDragOver)
		}
	}, [])

	return (
		<div
			ref={dropRef}
			style={{
				border: '1px solid black',
				height: '100vh',
				width: 'calc(100vw - 300px)',
				marginLeft: '15px',
			}}
		>
			{inputs.map((input, index) => (
				<textarea
					key={index}
					style={{ width: '25%', height: '50px', marginBottom: '10px' }}
					value={input}
					onChange={event => {
						setInputs([
							...inputs.slice(0, index),
							event.target.value,
							...inputs.slice(index + 1),
						])
					}}
				/>
			))}
			{images.map((src, index) => (
				<Image
					key={index}
					src={src}
					onClick={e => handleImageClick(e, index)}
				/>
			))}
		</div>
	)
}

export default WorkArea
