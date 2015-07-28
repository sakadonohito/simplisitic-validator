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
