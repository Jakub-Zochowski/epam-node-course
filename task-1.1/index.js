// Task 1.1
process.stdout.write('Write anything and hit enter to get it in reverse!' + '\n');

process.stdin.on('data', data => {
	try {
		const splitInput = data.toString().split('');
		const reverseInput = splitInput.reverse();
		const jointInput = reverseInput.join('');
		process.stdout.write(jointInput + '\n');
	} catch (err) {
		console.log(err)
	}
});