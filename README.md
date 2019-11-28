# __jsx-pragma__

![](https://github.com/ScottORLY/jsx-dom/workflows/jsx-pragma/badge.svg)
[![npm version](https://badge.fury.io/js/jsx-pragma.svg)](https://badge.fury.io/js/jsx-pragma)

Small javascript library for transpiling [JSX](https://reactjs.org/docs/react-api.html#createelement) to [DOM Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element).

## Installation

`npm i -D jsx-pragma`

__jsx-pragma__ provides functions for use with [Babel](https://babeljs.io/) to transpile JSX.
## Usage

The following JSX
```javascript
<div />
```
transpiles to [HTMLDIVElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement).

Add classes, ids, & common attributes
```javascript
<ul className={styles.list} />

<img src={imgSrc} />
```

The eventListener attribute takes an array that contains exactly 2 elements: the event type and the function.
```javascript
<span eventListener={['click', e => {
    console.log(e)
}]} />
```

Use a function as an element type to create functional components with custom attributes. Currently __jsx-pragma__ only supports functions as elements, classes are not yet supported but could prove useful for managing component state.
```javascript
const Component = ({ attributes: { items }}) => (
    <ul>
        {items.map(item => <li>{item.name}</li>)}
    </ul>
)

const items = ['foo' 'bar']

<Component items={items} />
```

Pass children to any element
```javascript
const Component = ({ children }) => (
    <div>
    { children }
    </div>
)

<Component>
    <div></div>
    Hey! These divs aren't going to nest themselves!
</Component>
```
