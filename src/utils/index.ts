export interface Flight {
    from: string;
    to: string;
}

export const sortAndValidateItineraries = (itinerary: Flight[]) => {
    const map = new Map<string, string>();
    const destinations = new Set<string>();
    const origins = new Set<string>();

    itinerary.forEach(({ from, to }) => {
        if (destinations.has(to)) {
            throw new Error(`Duplicate destination: ${to}`);
        }
        if (origins.has(from)) {
            throw new Error(`Duplicate origin: ${from}`);
        }
        map.set(from, to);
        destinations.add(to);
        origins.add(from);
    });

    const sortedItinerary = [];
    let current: Flight | undefined = itinerary.find(
        flight => !destinations.has(flight.from)
    );
    if (!current) {
        throw new Error('Invalid itinerary: orphan flight detected');
    }

    while (current) {
        sortedItinerary.push(current);
        const nextDestination = map.get(current.to);
        if (!nextDestination) {
            break;
        }
        current = { from: current.to, to: nextDestination };
    }

    if (sortedItinerary.length !== itinerary.length) {
        throw new Error('Invalid itinerary: orphan flight detected');
    }

    return sortedItinerary;
};

export const convertStr2Obj = (str: string) => {
    let jsonStr = str.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
    });
    jsonStr = jsonStr.replace(/'/g, '"');
    let obj = JSON.parse(jsonStr);
    return obj;
};