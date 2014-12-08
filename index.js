var slice = Array.prototype.slice,
	reverse = Array.prototype.reverse;

function partial(fn, args){
	return fn.bind.apply(fn, [this].concat(args));
}

function curry(fn, n){
	var length = typeof n === 'undefined' ? fn.length : n;

	return function curried(args){
		var curriedFn = function(){
			var newArgs = args.concat(slice.call(arguments));

			return newArgs.length >= length ? fn.apply(this, newArgs) : curried(newArgs);
		};

		// use correct toString method for debug purposes
		curriedFn.toString = function(){
			return 'curried ' + fn.toString();
		};

		return curriedFn;
	}([]);
}

function flip(fn){
	return function(){
		fn.apply(this, reverse.call(arguments));
	};
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
	return function(){
		return a;
	};
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

module.exports = {
	partial: partial,
	curry: curry,
	flip: flip,
	spread: spread,
	compose: compose,
	identity: identity,
	constant: constant,
	nullary: nullary,
	unary: unary,
	binary: binary,
	ternary: ternary
};