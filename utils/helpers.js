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

exports.generateRandomCode = length => {
    let possible = '0123456789'
    let string = ''
    for (let i = 0; i < length; i++) {
      string += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return string
}
