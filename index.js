function partial(fn, args){
	return fn.bind.apply(fn, [this].concat(args));
}

function curry(fn, n){
	var length = n || fn.length;

	return function curried(args){
		var c = function(){
			var newArgs = args.concat([].slice.call(arguments));

			return newArgs.length >= length ? fn.apply(this, newArgs) : curried(newArgs);
		};

		c.toString = fn.toString.bind(fn);
		return c;
	}([]);
}

function flip(){

}

function spread(fn){
	return fn.apply.bind(fn, this);
}

function compose(f, g){
	return function composed(){
		return f(g.apply(this, arguments));
	};
}

function identity(a){
	return a;
}

function constant(a){
	return partial(identity, a);
}

function nullary(fn){
	return function(){
		return fn();
	};
}

function unary(fn){
	return function(a){
		return fn(a);
	};
}

function binary(fn){
	return function(a, b){
		return fn(a, b);
	};
}

function ternary(fn){
	return function(a, b, c){
		return fn(a, b, c);
	};
}