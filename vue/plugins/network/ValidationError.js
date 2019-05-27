class ValidationError extends Error{
    constructor(errorDef){
        super('Validation Error');
        this.fields = {};w
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
