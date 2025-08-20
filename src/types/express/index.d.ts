
interface userPayload {
    sub: string;
    name: string;
}

declare namespace Express{
    export interface Request{
        user?: userPayload;
    }
}