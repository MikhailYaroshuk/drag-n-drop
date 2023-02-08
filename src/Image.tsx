interface ImageProps {
	src: string
	onClick: (event: React.MouseEvent<HTMLImageElement>) => void
}

const Image: React.FC<ImageProps> = ({ src, onClick }) => {
	return (
		<img
			src={src}
			alt='dummy'
			style={{ width: '150px', height: '150px' }}
			onClick={onClick}
		/>
	)
}

export default Image
