Validator.prototype.hook.changeReq = function(self,elm){
	var note = document.querySelector('#note');
	var p = note.parentElement;
	if(elm.value == 'etc' && elm.checked){
		note.setAttribute('data-valid','required');
		note.addEventListener('change',function(evt){self.validation(evt)},false);
		note.addEventListener('blur',function(evt){self.validation(evt)},false);
	}else{
		if(note.getAttribute('data-valid')){
			note.removeAttribute('data-valid');
			note.removeEventListener('change',function(evt){self.validation(evt)},false);
			note.removeEventListener('blur',function(evt){self.validation(evt)},false);
		}
		if(document.getElementById(note.name+'-err')) self.hide(note);
	}
	return true;
};

Validator.prototype.isValid.nameRequired = function(self,elm){
	//same data-valid value check required
	var elms = document.querySelectorAll('input[data-valid="nameRequired"]');
	if(!elms.length) return true;

	var errors = [];
	for(var i=0,len=elms.length; i<len; i++){
		var check = self.isValid.required(self,elms[i]);
		if(!check) errors.push(check);
	}
	return (errors.length)? false: true;
};

Validator.prototype.message.nameRequired = '名前の欄は両方入力必須です。';
