const getSupportTicket = async (ticketId) => {
    const { token, userId } = await login();
    const producer = await getProducer(token, userId);
    const ticketIdNumber = ticketId.split('-')[1];
    const response = await fetch(`https://api.shopware.com/producers/${producer.id}/supporttickets/${ticketIdNumber}`, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            accept: 'application/json',
            'x-shopware-token': token,
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch support ticket: ${response.status} ${response.statusText}`);
    }
    return await response.json();
};
const getProducer = async (token, userId) => {
    const response = await fetch(`https://api.shopware.com/producers?companyId=${userId}`, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            accept: 'application/json',
            'x-shopware-token': token,
        },
    });
    if (!response.ok) {
        throw new Error(`Shopware API: Failed to fetch producer: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data[0];
};
const login = async () => {
    const response = await fetch('https://api.shopware.com/accesstokens', {
        method: 'POST',
        body: JSON.stringify({
            shopwareId: process.env.SHOPWARE_ACCOUNT_EMAIL,
            password: process.env.SHOPWARE_ACCOUNT_PASSWORD,
        }),
        headers: {
            'content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Shopware API: Failed to login: ${response.status} ${response.statusText}`);
    }
    return await response.json();
};
export { getProducer, getSupportTicket };
