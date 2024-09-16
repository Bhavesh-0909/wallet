export async function getLoggedLocaly() {  
    const encryptedSeed = await localStorage.getItem('user-seed');
    if (encryptedSeed) {
        return encryptedSeed;
    } else {
        return null;
    }
}

// Function to encrypt the seed (Buffer) using Web Crypto API
async function encryptSeed(seedBuffer, password) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),  // Password used for encryption
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
  
    // Generate encryption key
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("salt"), // You should generate a random salt
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"]
    );
  
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector for AES-GCM
    
    // Convert Buffer to Uint8Array for encryption
    const seedArray = new Uint8Array(seedBuffer);
  
    // Encrypt the seed
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      seedArray // Use Uint8Array for encryption
    );
  
    return {
      iv: Array.from(iv), 
      encryptedSeed: Array.from(new Uint8Array(encrypted)) // Convert encrypted data to Array
    };
}
  
  // Function to set the encrypted seed in local storage
export async function setLoggedLocaly(seedBuffer, password) {
    const { encryptedSeed, iv } = await encryptSeed(seedBuffer, password);
  
    // Store encrypted seed and iv in local storage
    localStorage.setItem('user-seed', JSON.stringify({ iv, encryptedSeed }));
    return;
}

// Function to decrypt the seed
async function decryptSeed(encryptedSeed, iv, password) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),  // Password used for encryption
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
  
    // Derive the key used for decryption
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("salt"),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["decrypt"]
    );
  
    // Convert the iv and encrypted seed back to Uint8Array
    const ivArray = new Uint8Array(iv);
    const encryptedArray = new Uint8Array(encryptedSeed);
  
    // Decrypt the seed
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivArray },
      key,
      encryptedArray
    );
  
    // Return the decrypted seed as a Buffer
    return Buffer.from(decrypted);
  }
  
  // Function to get the encrypted seed from local storage and decrypt it
  export async function getSeedDecryptedLocally(password) {
    const storedData = await localStorage.getItem('user-seed');
    
    if (!storedData) return null;
  
    const { iv, encryptedSeed } = JSON.parse(storedData);
  
    const decryptedSeedBuffer = await decryptSeed(encryptedSeed, iv, password);
  
    return decryptedSeedBuffer;
  }
  