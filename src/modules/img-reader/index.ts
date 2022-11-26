const imgReader = async (files: File[]): Promise<string[]> => {
	const images = Array.from(files).filter((file) => file.size);

	const promises: Promise<string>[] = images.map((image) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (!reader.result) {
					return reject();
				}

				resolve(reader.result as string);
			};

			reader.readAsDataURL(image);
		});
	});

	const result = await Promise.allSettled(promises);

	return result
		.filter((promise) => promise.status === 'fulfilled')
		.map((promise) => (promise as PromiseFulfilledResult<string>).value);
};

export default imgReader;
