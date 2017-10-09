;(function(win, doc) {
    function lazyImg(options) {
        this.index = 0;
        this.imgLen = 0,
        this.imgList = null,
        this.init(options);
    }
    lazyImg.prototype = {
        init : function(options) {
            var optionDefault = {
                realSrcAtr : 'data-src',
                extendHeight : 0,
            },
            options = options || {},
            oThis = this;
            this.extend(options, optionDefault);
            this.imgList = document.querySelectorAll("["+ options.realSrcAtr +"]");
            this.imgLen = this.imgList.length;
            oThis.throttle(oThis.lazyLoadImg, [options.realSrcAtr, options.extendHeight], oThis);

            this.addEvent.call(window, 'resize', function() {
                oThis.throttle(oThis.lazyLoadImg, [options.realSrcAtr, options.extendHeight], oThis);
            });
            this.addEvent.call(window, 'scroll', function() {
                oThis.throttle(oThis.lazyLoadImg, [options.realSrcAtr, options.extendHeight], oThis);
            });
        },

        getImgTop : function(imgDom, extendHeight) {
            var offsetTop = imgDom.getBoundingClientRect().top,
                winHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if( offsetTop < winHeight+extendHeight ) {
                return true;
            }
        },

        lazyLoadImg : function(realSrcAtr, extendHeight) {
            for (var i=this.index; i<this.imgLen; i++) {
                if ( this.imgList[i].getAttribute(realSrcAtr) ) {
                    this.imgList[i].style.opacity = .8;
                    this.imgList[i].src = "http://img.zcool.cn/community/01766856e5373232f875520f64a552.gif";
                    this.imgList[i].style.webkitTransform = 'scale(.5, .5)';
                    if( this.getImgTop(this.imgList[i], extendHeight) ) {
                        this.k++;
                        this.imgList[i].src = this.imgList[i].getAttribute(realSrcAtr);
                        this.imgList[i].removeAttribute(realSrcAtr);
                        this.imgList[i].style.webkitTransition = 'opacity 1s';
                        this.imgList[i].style.webkitTransform = 'scale(1, 1)';
                        this.imgList[i].style.opacity = 1;
                    }
                }
            }
        },

        throttle : function(method, parma, context) {
            clearTimeout(method.tId);
            method.tId = setTimeout(function() {
                method.apply(context, parma);
            }, 50);
        },

        extend : function(options, tag) {
           for(var i in tag) {
                if( !(i in options) ) {
                    options[i] = tag[i];
                }
           }
           return this;
        },

        addEvent : function(event , fn) {
            if(win.addEventLinister ) {
                this.addEventLinister(event, fn, false);
            } else if ( win.attachEvent ) {
                this.attachEvent('on' + event, fn);
            } else {
                this['on' + event] = fn;
            }
        }
    };
    win.lazyImg = lazyImg;
})(window, document);

export default lazyImg;
