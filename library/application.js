let url = require('url'); 
const { bodyParser } = require ('./body-parse');

class Application {
    middlerware = [];
    index = 0;

    addRoute = (router) => {
        if(router) {
            this.middlerware.push({
                    action: router.submit
                    
                }
            );
        }
    }

    use = (action) => {
        if(action) {
            this.middlerware.push({
                    action: action,
                }
            );
        }
    }

    submit = async (req, res) => {
        try{
            this.index = 0;
            if(req.method !== 'GET' && req.method !== 'OPTIONS'){
                req.body = await bodyParser(req);
            }
            const reqUrl = url.parse(req.url, true);
            req.url = reqUrl;
            this.middlerware[0].action(req, res, this.next);
        }
        catch(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
    }

    next = (req, res) => {
        if(this.index >= this.middlerware.length - 1) return;
        else this.middlerware[++this.index].action(req, res, this.next);

    }

    
}

module.exports = new Application();