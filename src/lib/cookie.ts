export const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + "=";    
    const cookiesArray = document.cookie.split(";");
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            const  encryptedValue = cookie.substring(
                nameEQ.length,
                cookie.length
            );
            return JSON.parse(encryptedValue)
        }
    }
    return null;
};


export const deleteCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    document.cookie = `${name}=; Max-Age=0; path=/;`;
}