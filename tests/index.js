var tape = require('tape')
var pragma = require('../dist/jsx-dom')
var jsdom = require('jsdom-global')

jsdom()

tape('jsx-pragma', test => {
    var div = pragma.h(
        'div',
        {className: 'css', id: 'an-id'},
        pragma.h('div'),
        [
            'a',
            'list',
            'of strings',
            pragma.h('div', null, ['and other things'])
        ],
        pragma.h('span')
        )
    test.ok(div instanceof HTMLDivElement)
    test.ok(div.classList.contains('css'))
    test.equal(div.id, 'an-id')

    var svg = pragma.h('svg', { xmlns: 'http://www.w3.org/2000/svg' })
    test.equal(svg.namespaceURI, 'http://www.w3.org/2000/svg')

    var fragment = pragma.f({children: [div, svg]})
    test.ok(fragment instanceof DocumentFragment)

    test.end()
})
