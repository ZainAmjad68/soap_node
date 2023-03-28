const convert = require('xml-js');

const options = {compact: true, ignoreComment: true, alwaysChildren: true};

function parseJSONBodyToXML(jsArguments) {
    return convert.js2xml(jsArguments, { compact: true });
}

function convertJsonToSoapRequest(jsArguments) {
    let soapBody = parseJSONBodyToXML(jsArguments);
    console.log('soapBody', soapBody);
    return `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
            ${soapBody}
        </soap12:Body>
        </soap12:Envelope> `;
}

function convertXMLtoJSobject(xmlBody) {
    return convert.xml2js(xmlBody, options);
}

module.exports = {
    convertJsonToSoapRequest,
    convertXMLtoJSobject
}