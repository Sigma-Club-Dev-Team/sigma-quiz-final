export type PaginationPayload = {
    page: number,
    perPage: number,
    status?: string[] | boolean[],
    date?: string[] | Date[]
}