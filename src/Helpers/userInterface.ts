// userInterface.ts
export interface User {
    sub: string;
    rollType: string;
    userData: {
        name: string;
        universityEmail: string;
    };
}
