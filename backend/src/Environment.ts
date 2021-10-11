export class Environment {
    static URI: string = "mongodb+srv://Praveenb4305:JJHDAOIUUYWQENB@cluster0.omqta.mongodb.net/instamojo?retryWrites=true&w=majority";
    public static getPortNumber(): number {
        return (process.env.PORT as any) || 8080;   
    }

    public static getDbURI(): string {
        return this.URI;
    }
}