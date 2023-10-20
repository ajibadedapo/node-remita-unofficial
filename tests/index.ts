import { generateRRR } from './../src/index'; // Adjust the path accordingly

async function testGenerateRRR() {
    try {
        const payload = {
            amount: 1000,
            payerName: "Hammed Ajibade",
            payerEmail: "ajibadehammed@gmail.com",
            payerPhone: "07067518882",
            description: "payment for iphone X",
            serviceTypeId: '4619816541',
            customFields: [
                {
                    name: 'COMPANY',
                    type: 'String',
                    value: 'SYSTEMSPECS',
                },
            ],
        };
        const  merchantId= '';
        const  apiKey= '';
            const rrr = await generateRRR(payload, merchantId, apiKey);
        console.log('Generated RRR:', rrr);
    } catch (error) {
        console.error('Error:', error);
    }
}

testGenerateRRR().then(r => console.log(r));
