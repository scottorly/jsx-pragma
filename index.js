export const f = ({ children }) => {
    try {
        const fragment = document.createDocumentFragment()
        children.forEach(child => {
            if (typeof child === 'string') {
                fragment.appendChild(document.createTextNode(child))
            } else if (child instanceof HTMLElement === true) {
                fragment.appendChild(child)
            } else if (child instanceof Array === true) {
                child.forEach(item => fragment.appendChild(item))
            }
        })
        return fragment
    } catch (error) {
        console.log(error)
    }
}

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

        Object.entries(attributes).forEach(([key, value]) => {
            if (key !== 'className' && key !== 'eventListener' && key !== 'eventListeners') {
                element.setAttribute(key, value)
            }
        })

        const { className, eventListener, eventListeners } = attributes

        if (className != undefined) {
            className.split(" ").forEach(c => {
                element.classList.add(c)
            })
        }
        if(eventListener != undefined) {
            element.addEventListener(...eventListener)
        }
        if (eventListeners != undefined) {
            eventListeners.forEach(listener => element.addEventListener(...listener))
        }

        return element
    } catch (error) {
        console.log(error)
    }
}
