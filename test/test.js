import { h, f } from '../'
import should from 'should'
import jsdom from 'jsdom-global'

jsdom()

describe('jsx-dom', () => {
    it('should exist', () => {
        (<>
            <div>
                a string
                {[<></>]}
            </div>
        </>).should.be.ok()
    })

    it('should handle custom', () => {
        const Test = () => (<div></div>)
        (<Test />).should.be.ok()
    })
})