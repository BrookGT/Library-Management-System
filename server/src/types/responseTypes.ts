export interface IApiResponse<T = any> {
    _links: any[] | null;
    _warning: any[] | null;
    _attributes: any | null;
    _errors?: string | string[] | { [key: string]: string[] };
    _generated: string | null;
    payload: T;
}
