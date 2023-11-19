import db from './db';

export async function findUserByEmail(email: string) {
    try {
        return db.user.findUniqueOrThrow({
            where: { email },
        });
    } catch (error) {
        return null;
    }
}
