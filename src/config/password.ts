'use client';
export function setPasswordLocaly(password:string) {
    const encryptedPassword = btoa(password); 
    localStorage.setItem('userPassword', encryptedPassword);
    return;
}

export function getPasswordLocaly() {
    
    const encryptedPassword = localStorage.getItem('userPassword');
    
    const password = encryptedPassword ? atob(encryptedPassword) : null;
    
    if (password) {
        return password;
    } else {
        return null;
    }
}
