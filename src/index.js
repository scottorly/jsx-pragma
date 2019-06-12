export const h = (elementName, attributes, ...args) => {
    try {
        const children = args.length ? [].concat(...args) : []

        if (attributes === null || attributes === undefined) {
            attributes = {}
        }

        if (typeof elementName === 'function') {
            return elementName({
                attributes,
                children
            })
        }

        const ns = attributes.xmlns || 'http://www.w3.org/1999/xhtml'
        const element = document.createElementNS(ns, elementName)

        if (!Object.keys(attributes).length && children == undefined) {
            return element
        }

        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child))
            } else if (
                child instanceof HTMLElement == true ||
                child instanceof DocumentFragment === true ||
                child instanceof SVGElement === true
                ) {
                element.appendChild(child)
            } else if (child instanceof Array === true) {
                child.forEach(item => element.appendChild(item))
            }
        })

        for (const key in attributes) {
            const value = attributes[key]
            if (value === undefined || key === 'xmlns') {
                continue
            }
            if (key === 'className') {
                value.split(" ").forEach(c => element.classList.add(c))
                continue
            }
            if (key === 'eventListener') {
                element.addEventListener(...value)
                continue
            }
            if (key === 'eventListeners') {
                value.forEach(listener => element.addEventListener(...listener))
                continue
            }
            element.setAttribute(key, value)
        }
        return element
    } catch (error) {
        console.log(error)
    }
}

export const f = ({ children }) => {
    try {
        const fragment = document.createDocumentFragment()
        children.forEach(child => {
            if (child instanceof Array === true) {
                child.forEach(item => fragment.appendChild(item))
            } else if (typeof child === 'string') {
                fragment.appendChild(document.createTextNode(child))
            } else {
                fragment.appendChild(child)
            }
        })
        return fragment
    } catch (error) {
        console.log(error)
    }
}

export { h, f }