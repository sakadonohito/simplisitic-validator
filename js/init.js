(function(doc){
	doc.addEventListener('DOMContentLoaded',function(){
		var f1 = new Validator('form1');
		f1.init(f1);
		var btn1 = doc.getElementById('send_btn');
		if(btn1) btn1.addEventListener('click',function(event){
			event.preventDefault();
			f1.forceValidationAll(f1._form);
			var isValid = f1.hasErrors(f1._form);
			if(isValid){
				btn1.disabled = true;
				//f1._form.submit();
				alert('Validation OK!');
			}
			return true;
		},false);
	},false);
}(window.document));
