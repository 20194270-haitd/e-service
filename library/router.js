let url = require('url'); 
const { bodyParser } = require ('./body-parse');

class Router {
    router = [];
    index = 0;
    use = (uri, method, ...actions) => {
        if(method && uri && actions) {
            for(const action of actions){
                this.router.push({
                        action : action,
                        uri : uri, 
                        method : method 
                    }
                )
            }
        }
    }

    submit = async (req, res, next) => {
        this.index = 0;
        this.callMiddleware(req, res, next, 0);
    
    }

    callMiddleware = async (req, res, next, index) => {
        
        if(req.method.toLowerCase() === this.router[index].method &&  req.url.pathname === this.router[index].uri){ 
            
            res.setHeader('Content-Type', 'application/json');
            await this.router[index].action(req, res, this.next);

        }

        else {
            this.next(req, res, next);
            
        }
    }

    next = (req, res, next) => {
        if(this.index >= this.router.length - 1) next(req, res, next);
        else {
            this.callMiddleware(req, res, next, ++this.index);
        
        }
    }

    
}

module.exports = Router;