//console.log(process.argv)

var sum = 0,
	args = process.argv.slice(2);

for(var i in args){
	sum += +args[i];
}

console.log(sum);