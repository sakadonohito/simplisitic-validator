(function(doc){
	doc.addEventListener('DOMContentLoaded',function(){
		var f1 = new Validator('form1');
		f1.init(f1);
	},false);
}(window.document));
