
exports.successResponse = function (res, msg) {
	var data = {
		success:true,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		success:true,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		success:false,
		message: msg,
	};
	return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		success:false,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.badRequestResponse = function (res, msg, data) {
	var resData = {
		success:false,
		message: msg
	
	};
	return res.status(400).json(resData);
};

exports.rateLimitExceededResponse = function (res, msg, data) {
	var resData = {
		success:false,
		message: msg
	
	};
	return res.status(429).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
	var data = {
		status: false,
		message: msg,
	};
	return res.status(401).json(data);
};

exports.forbiddenResponse=function(res,msg){
	let data={
		status:false,
		message:msg
	}
	return res.status(403).json(data)
}

exports.conflictResponse=function(res,msg){
	let data={
		status:false,
		message:msg
	}

	return res.status(409).json(data)
}

exports.unprocessableEntityResponse=function(res,msg){
	let data={
		success:false,
		message:msg
	}
	return res.status(422).json(data)
}
exports.createdResponse=function(res,msg,data){
	let resData={
		success:true,
		message:msg,
		data:data
	}
	return res.status(401).json(resData)
}