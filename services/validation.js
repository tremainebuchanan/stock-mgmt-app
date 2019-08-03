exports.isValid = (obj) => {
    let result = {
        fields: [],
        success: true
    }
    for (const key in obj) {
        if (obj[key] === '') result.fields.push(key)
    }
    if(result.fields.length > 0) result.success = false
    return result
}
