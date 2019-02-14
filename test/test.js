import { h, f } from '../'
import should from 'should'
import jsdom from 'jsdom-global'

jsdom()

describe('jsx-dom', () => {

    describe('rendering', () => {

        it('should exist', () => {
            const div = (
                <div>
                    a string
                    {['a', 'list', 'of', 'things', <div>including divs</div>]}
                    {[
                        <></>, 
                        <div></div>
                    ]}
                </div>
            )
            div.should.be.instanceof(HTMLDivElement)
            div.namespaceURI.should.equal('http://www.w3.org/1999/xhtml')

        })
        
        it('should handle custom', () => {
            const Test = () => (<div></div>)
            (<Test />).should.be.ok()
        })

        it('shoud render svg with the proper namespace uri', () => {
            const svg = (<svg xmlns='http://www.w3.org/2000/svg' />)
            svg.namespaceURI.should.equal('http://www.w3.org/2000/svg')

        })
    })
})