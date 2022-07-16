export const createNode = <K extends keyof HTMLElementTagNameMap>(obj: {
    tag: K;
    classes?: string[];
    atributesAdnValues?: [string, string][];
    inner?: string;
}): HTMLElement => {
    const node = document.createElement(obj.tag);

    if (obj.classes) {
        node.classList.add(...obj.classes);
    }
    if (obj.atributesAdnValues) {
        obj.atributesAdnValues.forEach((atributeAndValue) =>
            node.setAttribute(atributeAndValue[0], atributeAndValue[1])
        );
    }
    if (obj.inner) {
        node.innerText = obj.inner;
    }
    return node;
};
