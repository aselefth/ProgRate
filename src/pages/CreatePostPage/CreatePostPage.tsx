import { useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import { useImage } from '../../hooks/useImage';
import { postValidation } from '../../services/validation';
import { useCreatePostMutation } from '../../store/Api/postsSlice';
import { ICreatePost } from '../../types/types';
import styles from './CreatePostPage.module.scss';
import Error from '../../components/Error/Error';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CreatePostPage() {
	const [title, setTitle] = useState('');
	const [plot, setPlot] = useState('');
	const { avatar, handleSetAvatar, setAvatar } = useImage();
	const [isValidationError, setIsValidationError] = useState(false);
	const [createPost] = useCreatePostMutation();
	const router = useNavigate();
	const ref = useRef<HTMLInputElement>(null);

	async function handleCreatePost(post: ICreatePost) {
		try {
			if (postValidation(post)) {
				await createPost(post);
				setTitle('');
				setPlot('');
				setAvatar('');
				router('/');
			} else {
				setIsValidationError(true);
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<form
			className={styles.createPostPageWrapper}
			onClick={(event) => {
				event.stopPropagation();
			}}
			onSubmit={(e) => {
				e.preventDefault();
				handleCreatePost({ title, plot, pictureBase: avatar });
			}}
		>
			<input
				type='text'
				placeholder='заголовок'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea value={plot} onChange={(e) => setPlot(e.target.value)} />
			{avatar && (
				<div className={styles.imageStack}>
					<div className={styles.imageContainer}>
						<FontAwesomeIcon
                            icon={faXmark}
							onClick={() => {
								setAvatar('');
								if (ref.current && ref.current.value) {
									ref.current.value = '';
								}
							}}
						/>
						<img src={avatar} />
					</div>
				</div>
			)}
			<input
				type='file'
				onChange={handleSetAvatar}
				name={avatar}
				ref={ref}
			/>
			<Button type='submit' fontSize='1.25rem'>
				поделиться
			</Button>
			<Error
				isError={isValidationError}
				setIsError={setIsValidationError}
			/>
		</form>
	);
}
