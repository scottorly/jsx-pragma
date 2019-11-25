var tape = require('tape')
var pragma = require('../dist/jsx-pragma')
var jsdom = require('jsdom-global')

jsdom()

tape('jsx-pragma', test => {
    var div = pragma.h(
        'div',
        { className: 'css', id: 'an-id' },
        pragma.h('div'),
        [
            'a',
            'list',
            'of strings',
            pragma.h('div', null, ['and other elements'])
        ],
        pragma.h('span')
    )
    test.ok(div instanceof HTMLDivElement)
    test.ok(div.classList.contains('css'))
    test.equal(div.id, 'an-id')
    test.equal([...div.children].length, 3)

    test.equal(
        pragma.h('div', null, 'a string').textContent,
        'a string'
    )

    test.equal(
        pragma.h('div', null, ['a string', 'another one']).textContent,
        ['a string', 'another one'].join('')
    )

    test.equal(
        pragma.h('svg', { xmlns: 'http://www.w3.org/2000/svg' }).namespaceURI,
        'http://www.w3.org/2000/svg'
    )

    var fragment = pragma.f({ children: [div, pragma.h('div')] })
    test.ok(fragment instanceof DocumentFragment)

    test.end()
})
