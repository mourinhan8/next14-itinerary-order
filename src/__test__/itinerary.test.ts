import { POST } from "../app/api/route";


it('should return data with status 200', async () => {
    const request = new Request(`${process.env.BASE_URL}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            itinerary: [
                { from: 'GRU', to: 'SCL' },
                { from: 'SFO', to: 'GRU' },
                { from: 'MIA', to: 'SFO' },
                { from: 'EZE', to: 'MIA' }
            ],
        }),
    });
    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.length).toBe(4);
    expect(body).toEqual([
        { from: 'EZE', to: 'MIA' },
        { from: 'MIA', to: 'SFO' },
        { from: 'SFO', to: 'GRU' },
        { from: 'GRU', to: 'SCL' }
    ]);
});