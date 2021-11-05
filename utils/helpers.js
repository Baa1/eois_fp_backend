exports.isEmpty = value => {
    switch (value) {
        case '':
        case '""':
        case null:
        case 'null':
        case undefined:
        case 'undefined':
        case []:
            return true
        default:
            return false
    }
}

exports.dataToJson = data => {
    if (Array.isArray(data)) {
        return data.map(e => e.toJson())
    } else {
        return data.toJson()
    }
}
