class ValidationError extends Error{
    fields = []

    constructor(errorDef){
        super('Validation Error');
        Object.keys(errorDef).forEach(field => {
            if (Array.isArray(errorDef[field])){
                this.fields[field] = errorDef[field][0]
            } else {
                this.fields[field] = errorDef[field]
            }
        })
    }
}

export default ValidationError;