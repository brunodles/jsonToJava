var equivalence = {
	'number' : 'Long'
}

function generateJavaClass(className, data){
	if (data === null)
		return "";
	if (typeof data === 'string')
		data = JSON.parse(data);
	if (className === '')
		className = "Result";
	var keys = Object.keys(data);
	var objects = {};
	className = capitalizeFirstLetter(className);
	var result = "public class "+className+" {\n";
	for (i in keys) {
		var key = keys[i];
		var value = data[key];
		var type = typeof value;
		console.log(key+' typeof '+type);
		if (Array.isArray(value)) {
			var typeName = capitalizeFirstLetter(fixListClass(key));
			type = 'List<'+typeName+'>';
			objects[typeName] = value[0];
		} else if (type === 'object') {
			type = capitalizeFirstLetter(key);
			objects[type] = value;
		} else if (equivalence[type] != undefined) {
			type = equivalence[type];
		} else {
			type = capitalizeFirstLetter(type);
		}
		result += '\tpublic '+type+ ' '+key+';\n';
	}
	result += "}\n";
	for (name in objects) {
		result += generateJavaClass(name, objects[name]);
	}
	return result;
}

function fixListClass(string){
	if (string.endsWith('s'))
		return string.substring(0, string.length-1);
	return string;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
