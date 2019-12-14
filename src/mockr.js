export class MockR {
    static instance;
    constructor(){
        this._routes = [];
        window.fetch = this.controller.bind(this);
    };
    static getInstance() {
        if (MockR.instance) {
          return MockR.instance;
        }
        MockR.instance = new MockR();
        return MockR.instance;
    }
    controller(uri, options) {
        if(options==undefined){
            //This is a GET
            let r = this.getRouteByUri(uri,"GET");
            return Promise.resolve({ json: () => Promise.resolve(promisedData)});
        }
    }
    get Routes (){
        return this._routes;
    }
    addRoute(verb,uri,data){
        let r = new MockRRoute();
        r.Verb = verb;
        r.Uri = uri;
        r.data = data;
        this.Routes.push(r);
    }
    getRouteByUri(uri,verb)
    {
        for(let i=0;i<this.Routes.length;i++)
        {
            if(this.Routes[i].Uri==uri && this.Routes[i].Verb == verb){
                return this.Routes[i];
            }
        };
    }
}

export class MockRRoute {   
    constructor(){
        this._verbs = ["POST", "GET", "PUT", "DELETE"];
    }
    get Verb (){
        /*POST, GET, PUT or DELETE*/
        return this._verb;
    }
    set Verb (value){
        if (this._verbs.includes(value.toUpperCase()))
        {
            this._verb = value;
        }
        else
        {
            throw new Error(value.toUpperCase() + " is not a valid HTTP verb for MockR");
        }
    }
    get Uri (){
        return this._uri;
    }
    set Uri (value){
        this._uri = value;
    }
    get Data (){
        return this._data;
    }
    set Data (data){
        JSON.parse(data);
        this._data = value;
    }
}