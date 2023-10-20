import axios from 'axios';

interface Payload {
    serviceTypeId: string;
    amount: number; // The total amount should be a string
    orderId?: number; // An order ID should be provided
    payerName: string;
    payerEmail: string;
    payerPhone: string;
    description: string;
    customFields?: {
        name: string;
        type: string;
        value: string;
    }[];
}

export async function generateRRR(payload: Payload, merchantId: string, apiKey: string): Promise<string> {
    try {
        // Calculate remitaConsumerToken
        const remitaConsumerToken = generateConsumerToken(
            merchantId,
            payload.serviceTypeId,
            payload.orderId || generateOrderId(),
            payload.amount,
            apiKey
        );

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `remitaConsumerKey=${merchantId},remitaConsumerToken=${remitaConsumerToken}`,
        };

        // Make the POST request
        const response = await axios.post(
            'https://login.remita.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit',
            payload,
            { headers }
        );

        return response.data;
    } catch (error) {
        throw new Error('Failed to generate RRR: ' + error);
    }
}

function generateConsumerToken(
    merchantId: string,
    serviceTypeId: string,
    orderId: number | string,
    amount: number,
    apiKey: string
): string {
    const tokenString = `${merchantId}${serviceTypeId}${orderId}${amount}${apiKey}`;
    return require('crypto').createHash('sha512').update(tokenString).digest('hex');
}

    function generateOrderId(): string {
        return Math.random().toString(36).substr(2, 12);
    }
