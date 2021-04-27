import { Id } from "../common/id";
import { isNil } from "../common/util/isNil";

export interface ToastOptions {
    duration: number;
}

export class ToastManager {
    constructor(private root: HTMLDivElement) {
        if (isNil(root)) {
            throw new Error("Root of toast can not be nil ");
        }
        if (root.tagName.toLowerCase() !== "div") {
            throw new Error("Root of toast must be a dib");
        }
    }

    toast(message: string, options: ToastOptions) {
        const toastElement = this.createToastElement(message);
        this.root.append(toastElement);
        setTimeout(() => {
            toastElement.remove();
        }, options.duration);
    }

    private createToastElement(message: string) {
        const toastElement = document.createElement("div");
        toastElement.classList.add("toast");
        toastElement.id = new Id().value;
        toastElement.textContent = message;
        return toastElement;
    }
}
