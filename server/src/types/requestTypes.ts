export type GetRequestParam = {
    pagination?: { pageSize: number; page: number } | null;
    filter?: any;
    sorting?: { property: string; direction: string } | null;
};

export type PostRequestParam = {
    files?: { type: string; file: File }[] | null;
    data?: any | null;
};

export type PutRequestParam<T = any> = {
    data?: T | null;
    published?: any | null;
    archived?: any | null;
};
