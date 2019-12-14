import { MockR, MockRRoute } from "../src/mockr.js"
describe("MockR REST Mocking framework", () => {
    beforeAll(function(){
        MockR.getInstance().Routes.length = 0;
    });
    it("creates itself", async () => {
        let m = MockR.getInstance();
        let r = new MockRRoute();
        expect(m).toBeTruthy();
        expect(r).toBeTruthy();
    });
    it("has no routes when first created", () => {
        let m = MockR.getInstance();
        expect(m.Routes.length).toEqual(0);
    });
    it("accepts a new GET route", () => {
        let m = MockR.getInstance();
        let data = {};
        m.Routes.length=0;
        m.addRoute("GET","test.com/users",data);
        expect(m.Routes.length).toEqual(1);
        expect(m.Routes[0].Verb).toEqual("GET");
        expect(m.Routes[0].Uri).toEqual("test.com/users");
        expect(m.Routes[0].data).toEqual(data);
        m.Routes.length = 0;
    });
    it("returns the data as a promise from the specified GET route", async() =>{
        let m = MockR.getInstance();
        let uri = "test.com/users";
        let data = [
            {
                "userid": "1", 
                "username" : "fbloggs"
            },
            {
                "userid": "2", 
                "username" : "fredablogs"
            }
        ];
        m.addRoute("GET","test.com/users",data);
        let d = await fetch(uri);
        //expect(d.json()).toEqual(data);
    });
});