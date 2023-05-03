const {convertJsonToSoapRequest, makeGetTransactionReadable, updateObjectKeys} = require("./utils");
const {sendRequest} = require("./request");
const {getResidentTransactionsRequestJSON, getResidentTransactionsResponseXML} = require("./testData")

const url = `https://www.w3schools.com/xml/tempconvert.asmx`;        
  
async function getResidentTransactions(auth, properties) {
    let initialPayload = getResidentTransactionsRequestJSON;
    let payload = updateObjectKeys(auth, initialPayload);
    payload = updateObjectKeys(properties, initialPayload);
    console.log(payload['soapenv:Envelope']['soapenv:Body']['tem:getresidenttransaction']);
    let args = convertJsonToSoapRequest(payload);
    console.log('Payload in XML', args);
    /*
    let remoteResponse = await sendRequest({
        method: "POST",
        url: url,
        data: args
    });
    */
    // use test data for now
    let remoteResponse = getResidentTransactionsResponseXML;
    console.log('remoteResponse', remoteResponse);
    var result = makeGetTransactionReadable(remoteResponse);
    console.log('final Transaction data: ', result);
}

(async () => {
    try {
            let auth = {
                "tem:pmcid": 1234,
                "tem:siteid": 4567,
                "tem:licensekey": "1234abcd4567",
                "tem:system": "OneSite" 
            };
            let properties = {
                "tem:propertyid": 9876,
                "tem:residentid": 4821,
                "tem:residentstatus": "C",
                "tem:propertynumber": 1,
                "tem:residentheldthestatus": "10",
                "tem:residentwillhavethestatus": "10"    
            };
            await getResidentTransactions(auth, properties);
    } catch (e) {
            console.error('failed due to -> ', e);
            process.exit(1);
    } finally {
            process.exit(0);
    }
})();