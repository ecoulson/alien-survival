export interface Message<T = any> {
    path: string;
    data: T;
}
