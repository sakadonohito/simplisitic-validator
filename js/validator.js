var Validator = (function(){

	var Validator = function(form_id){
		this._form = document.getElementById(form_id);
	};//constructor

	var p = Validator.prototype;

	p.isValid = {
		required : function(self,elm){ return !!elm.value;},
		checkRequired : function(self,elm,reqNum){
			var no = reqNum[0] || 1;
			var elms = document.getElementsByName(elm.name);
			var len = elms.length;
			var ok = 0;
			for(var i=0; i<len; i++){
				ok += (elms[i].checked)? 1: 0;
			}
			return no <= ok;
		},
		email : function(self,elm){
			return !!(elm.value == '' || elm.value.match(/^[a-zA-Z0-9][a-zA-Z0-9._-]+[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9.-_]+[a-z]+$/) && !/\.{2,}/.test(elm.value));
		},
		numalpha : function(self,elm){
			return !!(elm.value == '' || elm.value.match(/^[a-zA-Z0-9]+$/));
		},
		number : function(self,elm){
			return !!(elm.value == '' || elm.value.match(/^[0-9]+$/));
		},
		alphabet : function(self,elm){
			return !!(elm.value == '' || elm.value.match(/^[a-zA-Z]+$/));
		},
		min : function(self,elm,reqNum){
			var no = reqNum[0];
			return (elm.value == '' || no <= elm.value.length);
		},
		max : function(self,elm,reqNum){
			var no = reqNum[0];
			return (elm.value == '' || elm.value.length <= no);
		},
		custom : {}
	};

	p.message = {

		required : 'required!',
		checkRequired : 'require checked! ',
		email : 'invalid email',
		min : 'too less!',
		max : 'too long!',
		numalpha : 'only number or alphabet',
		alphabet : 'only alphabet',
		number : 'only number',
		custom : {}

	};

	p.parseTask = function(d){
		var tmp = d;
		var m = '';//validation method name or 'custom'
		var cm = '';//validation custom method name
		var arg = [];//arguments
		var ret = {};

		if(/(\[.+?\])/.test(tmp)){//validation method に引数があるのなら
			var a = /\[(.+?)\]/.exec(tmp)[1];
			ret.arg = a.split(' ');
			tmp = tmp.replace(/(\[.+?\])/,'');
		}

		var tmpArr = tmp.split('-');
		ret.m = tmpArr[0];
		if(/^custom$/.test(tmpArr[0])){
			ret.cm = tmpArr[1];
		}
		return ret;
	},

	p.show = function(elm,m){
		var msg = elm.getAttribute('data-error-message') || m;
		var errDispElmId = elm.getAttribute('data-error-id');
		var errElm = document.getElementById(errDispElmId);
		if(errElm && errElm.textContent == msg) return true;
		if(errElm){
			errElm.textContent = msg;
		}else{
			var errDisp = document.createElement('span');
			errDisp.id = errDispElmId;
			errDisp.className = 'valid-error';
			errDisp.textContent = msg;
			var td = elm.parentElement;
			td.appendChild(errDisp);
		}
	};

	p.hide = function(elm){
		var errDispElmId = elm.getAttribute('data-error-id');
		var errDisp = document.getElementById(errDispElmId);
		if(errDisp){
			var td = elm.parentElement;
			td.removeChild(errDisp);
		}
	};

	p.validation = function(evt){
		var self = this;
		var elm = evt.target
		var msg = [];
		var valiDataArr = elm.getAttribute('data-valid').split(',');
		valiDataArr.forEach(function(valiData){
			var valiAttr = self.parseTask(valiData);
			var type = valiAttr.m;
			var customType = (type === 'custom')? valiAttr.cm: '';
			var arg = valiAttr.arg || false;
			if(customType){
				var _v = self.isValid[type][customType](self,elm,arg);
				if(!_v) msg.push(self.message[type][customType]);
			}else{
				var _v = self.isValid[type](self,elm,arg);
				if(!_v) msg.push(self.message[type]);
			}
		});
		if(msg.length){
			self.show(elm,msg.join(','));
		}else{
			self.hide(elm);
		}

		//if hook
		var hook = elm.getAttribute('data-valid-hook');
		if(hook) self.hook[hook](self,elm);
	};

	p.init = function(){
		var self = this;
		var obj = self._form.querySelectorAll('*[data-valid]');
		var listeners = Array.prototype.slice.call(obj);

		listeners.forEach(function(listener){
			listener.addEventListener('change',function(event){self.validation(event)},false);
			listener.addEventListener('blur',function(event){self.validation(event)},false);
		});
	};

	p.forceValidationAll = function(f){
		var self = this;
		var obj = f.querySelectorAll('*[data-valid]');
		var listeners = Array.prototype.slice.call(obj);

		var evt = document.createEvent('MouseEvents');
		evt.initEvent('blur',false,true);
		listeners.forEach(function(listener){
			listener.dispatchEvent(evt);
		});
	};

	p.hasErrors = function(f){
		var obj = f.querySelectorAll('*.valid-error');//classに'err'のある要素
		return !obj.length;
	};

	p.hook = {};

	return Validator;
}());
