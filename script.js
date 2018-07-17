$(function () {

	var theTemplateScript = $("#address-template").html();  

	var Template = Handlebars.compile(theTemplateScript);

	Handlebars.registerHelper('gt', function( a, b ){
		var next =  arguments[arguments.length-1];
		return (a >= b) ? next.fn(this) : next.inverse(this);
	});

	var days = $("#input-val").val();

	Handlebars.__switch_stack__ = [];

	Handlebars.registerHelper( "switch", function( value, options ) {
		Handlebars.__switch_stack__.push({
			switch_match : false,
			switch_value : value
		});
		var html = options.fn( this );
		Handlebars.__switch_stack__.pop();
		return html;
	} );
	Handlebars.registerHelper( "case", function( value, options ) {
		var args = Array.from( arguments );
		var options = args.pop();
		var caseValues = args;
		var stack = Handlebars.__switch_stack__[Handlebars.__switch_stack__.length - 1];
		
		if ( stack.switch_match || caseValues.indexOf( stack.switch_value ) === -1 ) {
			return '';
		} else {
			stack.switch_match = true;
			return options.fn( this );
		}
	} );
	Handlebars.registerHelper( "default", function( options ) {
		var stack = Handlebars.__switch_stack__[Handlebars.__switch_stack__.length - 1];
		if ( !stack.switch_match ) {
			return options.fn( this );
		}
	} );
	
	var data={
	  "name": "Sathish",
	  "location": "Bangalore",
	  "company": "Wizroots Technologies",
	  "state" : days,

	  "item" : [
		{"available":true, "name": "Gowtham", "age":18},
		{"available":false, "name": "Benjamin", "age":21},
		{"available":true, "name": "Gubera kannan", "age":11},
		{"available":true, "name": "Arun", "age":36},
		]
	};

	var theCompiledHtml = Template(data);

	$('.content-placeholder').html(theCompiledHtml);

  });
  