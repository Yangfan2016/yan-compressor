var expect=window.chai.expect;

describe("测试vendor.js",function () {
    it("Vue.js",function () {
        expect(typeof Vue).to.be.equals("function")
    })
    it("jQuery.js",function () {
        expect($).to.be.equals(jQuery)
    })
})

describe("测试app.js",function () {
    it("a.js",function () {
        expect(a).to.be.equals(666)
    })
    it("b.js",function () {
        expect(typeof b).to.be.equals("number")
    })
})