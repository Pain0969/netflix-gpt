export const checkValidData = ( email, password) =>{
    // const isNameValid = /^[A-Za-z][A-Za-z0-9_]{4,29}$/.test(name);
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(password);
    
    console.log();
    // if(!isNameValid) return "This name is not valid!";
    if(!isEmailValid) return "Email Id is not valid";
    if(!isPasswordValid) return "Password is not valid";

    return null;
};