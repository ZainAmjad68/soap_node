const {convertJsonToSoapRequest, convertXMLtoJSobject} = require("./utils");
const {sendRequest} = require("./request");

const url = `https://www.w3schools.com/xml/tempconvert.asmx`;        

let mapper = {
    Celsius: 'CelsiusToFahrenheit',
    Fahrenheit: 'FahrenheitToCelsius'
}

async function tempConvert(unit, temperature) {
    try {
        let payload = {
            [mapper[unit]]: {
                _attributes: {
                    xmlns:"https://www.w3schools.com/xml/"
                },
                [unit]: {
                    _text: `${temperature}`
                },
            }
        };  
        console.log('Payload in JSON', payload);
        let args = convertJsonToSoapRequest(payload);
        console.log('Payload in XML', args);
        let remoteResponse = await sendRequest({
            method: "POST",
            url: url,
            data: args
        });
        console.log('remoteResponse', remoteResponse);
        var result = convertXMLtoJSobject(remoteResponse);
        console.log('soap:Body', result['soap:Envelope']['soap:Body']);
        console.log('Final Result:', result['soap:Envelope']['soap:Body'].CelsiusToFahrenheitResponse.CelsiusToFahrenheitResult._text);

    } catch (err) {
        throw new Error(
        `Oops something went wrong. Please try again later ${err}`
        );
    }
}

(async () => {
    try {
            await tempConvert('Celsius', 20);
    } catch (e) {
            console.error('failed due to -> ', e);
            process.exit(1);
    } finally {
            process.exit(0);
    }
})();