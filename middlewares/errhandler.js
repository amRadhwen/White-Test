const handlePathError = (error)=>{
	const paths = Object.keys(error.errors);
	let _message = "";
	if (paths.length == 1)
		_message = `Invalid ${paths[0]}`
	else {
		paths.forEach(path=>{
			_message += `Invalid ${path}<br/>`
		})
	}
	return _message;
};

module.exports = {
	handlePathError
}