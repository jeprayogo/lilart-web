import crypto from "crypto";
import { buffer } from "stream/consumers";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY; //32 bytes base64
const IV_LENGTH = 12;

export function encrypt(text: string) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = Buffer.from(SECRET_KEY as string, 'base64');
    
    const cipher = crypto.createCipheriv('aes-256-gcm', key as crypto.CipherKey, iv as crypto.BinaryLike);
    
    let encrypted = cipher.update(text, 'utf-8', 'hex');

    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return iv.toString("hex") + ":" + encrypted + ":" + authTag;
}

export function decrypt(text: string) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts[0],  'hex');
    const encryptedText = textParts[1];
    const authTag = new Uint8Array(Buffer.from(textParts[2], 'hex'));
    const key = Buffer.from(SECRET_KEY as string, 'base64');
    
    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        key as crypto.CipherKey,
        iv as crypto.BinaryLike
    );

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    
    return decrypted;
}