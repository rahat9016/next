export const getCookie = (name: string) => {
    const nameEQ = name + "=";
    
    const cookiesArray = window.document.cookie.split(";");
    
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            const  encryptedValue = cookie.substring(
                nameEQ.length,
                cookie.length
            );
            
            return JSON.parse(encryptedValue)
            // return decryptedValue;
        }
    }
    return null;
};