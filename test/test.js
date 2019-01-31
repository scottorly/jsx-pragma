import { h, f} from '../'
import should from 'should'
import jsdom from 'jsdom-global'

jsdom()

describe('jsx-dom', () => {
    it('should exist', () => {
        const div = (<div></div>)
        should(div).be.ok()
        should(<></>).be.ok()
    })
})