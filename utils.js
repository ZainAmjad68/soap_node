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

function makeGetTransactionReadable(xmlResponse) {
    const result = convert.xml2json(xmlResponse, options);
    console.log(result);

    const transactions = JSON.parse(result)['s:Envelope']['s:Body']['getresidenttransactionResponse']['getresidenttransactionResult']['OpenTransactions']['OpenTransaction'];

    const readable_transactions = transactions.map(transaction => ({
        leaId: transaction.LeaID._text,
        reshId: transaction.ReshID._text,
        siteId: transaction.SiteID._text,
        unitId: transaction.UnitID._text,
        propertyNumberId: transaction.PropertyNumberId._text,
        propertyNumber: transaction.PropertyNumber._text,
        catCode: transaction.CatCode._text,
        transName: transaction.TransName._text,
        transDesc: transaction.TransDesc._text,
        transCodeDesc: transaction.TransCodeDesc._text,
        transAmt: transaction.TransAmt._text,
        ldtId: transaction.ldtID._text,
        transactionDate: transaction.TransactionDate._text,
        subJournal: transaction.SubJournal._text,
        groupToRent: transaction.Grouptorent._text
    }));
    return readable_transactions;
}

const deepMerge = (target, property, value) => {
    for (let key in target) {
        if (typeof target[key] === 'object') {
            deepMerge(target[key], property, value);
        } else {
            if (key === property) {
                target[key] = value
            }
        }
    }
    return target
}


function updateObjectKeys(obj1, obj2) {
for (const [key, value] of Object.entries(obj1)) {
    deepMerge(obj2, key, value);
}
return obj2;
}


module.exports = {
    convertJsonToSoapRequest,
    convertXMLtoJSobject,
    makeGetTransactionReadable,
    updateObjectKeys
}