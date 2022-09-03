const handleCustomError = (error) => {
    if (error.response) {
        if (error.response.data.msg) {
            return error.response.data.msg
        }
        const err = error.toJSON();
        return err.message;
    }
    if (error.request) {
        return error.toString();
    }
    return `Error : ${error.message}`;
};

export default handleCustomError;
