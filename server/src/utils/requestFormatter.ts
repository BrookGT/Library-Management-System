import { Request } from "express";
import {
    GetRequestParam,
    PostRequestParam,
    PutRequestParam,
} from "../types/requestTypes";

export const formatGetRequest = (req: Request): GetRequestParam => {
    const { page = 1, limit = 8, filter, sortBy, sortOrder } = req.query;

    return {
        pagination: {
            pageSize: Number(limit),
            page: Number(page),
        },
        filter: filter ? JSON.parse(filter as string) : undefined,
        sorting:
            sortBy && sortOrder
                ? { property: sortBy as string, direction: sortOrder as string }
                : undefined,
    };
};

export const formatPostRequest = (req: Request): PostRequestParam => {
    const { files, ...data } = req.body;

    return {
        files: files ? JSON.parse(files as string) : null,
        data: data ? JSON.parse(data as string) : null,
    };
};

interface PaginationParams {
    page: number;
    limit: number;
    search: string;
}

export const parsePaginationParams = (req: Request): PaginationParams => {
    const { page = "1", limit = "8", search = "" } = req.query;

    // Parse and validate pagination parameters
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (isNaN(parsedPage) || isNaN(parsedLimit)) {
        throw new Error("Invalid pagination parameters");
    }

    return {
        page: parsedPage,
        limit: parsedLimit,
        search: search.toString(),
    };
};
