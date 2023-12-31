import { useState, useEffect } from 'react';
import axios from 'axios';

function PicsAPI(token) {
	const [ pics, setPics ] = useState([]);

	const getPics = async () => {
		try {
			const { data: { status, success, content } } = await axios.get('/api/pics', {
				headers: { Authorization: token }
			});
			setPics(pics => [...(success ? content : [])]);
		} catch (err) {
			// console.log(err.response.data.content);
		};
	};

	const delPic = async id => {
		try {
			const { data } = await axios.delete(`/api/pics/${id}`, {
				headers: { Authorization: token }
			});
			const { success, content } = data;

			return {
				success,
				content
			};
		} catch (err) {
			// console.log(err);
		}
	};

	const uploadPic = async image => {
		try {
			if (image.loading) return {
				success: false,
				content: "Ya hay una subida de imagen en progreso"
			};

			const { data } = await axios.post('/api/pics', image.image, {
				headers: {
					Authorization: token
				}
			});

			const { success, content } = data;

			return {
				success,
				content
			};
		} catch (err) {
			return {
				success: false,
				content: err.message
			};
		};
	};

	useEffect(() => {
		if (token) getPics();
	}, [token]);

	return {
		pics: [ pics, setPics, getPics ],
		delPic,
		uploadPic
	};
};

export default PicsAPI;