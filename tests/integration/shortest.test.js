const useDijkstraAlgorithm = require('../../dijkstra');

test('customer test: success', async () => {
	jest.setTimeout(10000);

	const initData = [
		['JFK', 'ATL', 150],
		['ATL', 'SFO', 400],
		['ORD', 'LAX', 200],
		['LAX', 'DFW', 80],
		['JFK', 'HKG', 800],
		['ATL', 'ORD', 90],
		['JFK', 'LAX', 500],
	]

	const result = useDijkstraAlgorithm(initData, 'JFK', 'LAX', 3)

	expect(result.cost === 440).toBeTruthy()
}, 900000);

test('customer test: fail', async () => {
	jest.setTimeout(10000);

	const initData = [
		['JFK', 'ATL', 150],
		['ATL', 'SFO', 400],
		['ORD', 'LAX', 200],
		['LAX', 'DFW', 80],
		['JFK', 'HKG', 800],
		['ATL', 'ORD', 90],
		['JFK', 'LAX', 500],
	]

	const result = useDijkstraAlgorithm(initData, 'JFK', 'LAX', 3)

	expect(result.cost !== 440).toBeTruthy()
}, 900000);
