export const loginErrors = (error:any) => {
    let errors = {logs: "", password: ""};

    if (error.message.includes("_id"))
    {
        errors.logs = "Incorrect 'Username' or 'Email'";
    }

    if (error.message.includes("incorrect_log"))
    {
        errors.password = "Incorrect logs or password"
    }

    return errors;
};
