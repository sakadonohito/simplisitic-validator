# Simplistic Validation

### easy and simplicity javascript validation

* using Vanilla JS framework
* extentionable validation rule
* you can change validation error message

### breakdown

* js/validator.js is main Library. only required include file.
* js/validator-extention.js is sample expand Validation.
* js/validator-messages.js is sample change validation error message
* js/init.js is sample initialize body onload event js
* css/validation.css is sample css
* index.html is sample form html file

### synopsis

```html
<input type="text" name="hoge" data-valid="required,number,min[4],max[12]" data-error-id="nameErr" data-error-message="please input your lucky number."/>
```

#### valid rule

attribute name data-valid is assignment validation rule.
if you want multi rule then separate ,(connma).
set argument is []

validation rules value is required,checkRequired,min,max...

other, you can customize.


#### designation error display dom

data-error-id is designation show the error message element.

if multiplex input element to one error message element then same data-error-id.

#### assignment special error message

you can change error messages , you can extentionable error messages.
you wrote validation-messages.js if change error messages.

but if not use default error message, assignment individually error message.

set data-error-message attribute then used it.



please show sample.
