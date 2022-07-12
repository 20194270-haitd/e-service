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
        this.index = 0;
        this.middlerware[0].action(req, res, this.next);
    }

    next = (req, res) => {
        if(this.index >= this.middlerware.length - 1) return;
        else this.middlerware[++this.index].action(req, res, this.next);

    }

    
}

module.exports = new Application();