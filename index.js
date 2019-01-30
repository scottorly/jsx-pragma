export const h = (elementName, attributes, ...args) => {
    try {

        let children = args.length ? [].concat(...args) : []

        if (attributes === null || attributes === undefined) {
            attributes = {}
        }

        if (typeof elementName === 'function') {
            return elementName({
                attributes,
                children
            })
        }

        const element = document.createElement(elementName)

        if (!Object.keys(attributes).length && children == undefined) {
            return element
        }

        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child))
            } else if (child instanceof HTMLElement == true || child instanceof DocumentFragment === true) {
                element.appendChild(child)
            } else if (child instanceof Array === true) {
                child.forEach(item => element.appendChild(item))
            }
        })

        for (const key in attributes) {
            const value = attributes[key]
            if (value === undefined) {
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
                child.forEach(item => fragment.appendChild(h(item)))
            } else if (typeof child === 'string') {
                fragment.appendChild(document.createTextNode(child))
            } else if (child instanceof HTMLElement === true || child instanceof DocumentFragment === true) {
                fragment.appendChild(child)
            } else {
                fragment.appendChild(h(child))
            }
        })
        return fragment
    } catch (error) {
        console.log(error)
    }
}
