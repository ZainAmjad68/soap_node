const getResidentTransactionsRequestJSON = {
    "soapenv:Envelope": {
      "_attributes": {
        "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "xmlns:tem": "http://tempuri.org/"
      },
      "soapenv:Header": {},
      "soapenv:Body": {
        "tem:getresidenttransaction": {
          "tem:auth": {
            "tem:pmcid": "pmcid",
            "tem:siteid": "siteid",
            "tem:licensekey": "licensekey",
            "tem:system": "systemOneSite"
          },
          "tem:getresident": {
            "tem:ExtensionData": {},
            "tem:propertyid": "ALL",
            "tem:residentid": "ALL",
            "tem:residentstatus": "C",
            "tem:propertynumber": "ALL",
            "tem:residentheldthestatus": "10",
            "tem:residentwillhavethestatus": "10"
          }
        }
      }
    }
  }

const getResidentTransactionsResponseXML = `
<s:Envelope xmlns:s="[http://schemas.xmlsoap.org/soap/envelope/](http://schemas.xmlsoap.org/soap/envelope/)">
<s:Body xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)" xmlns:xsd="[http://www.w3.org/2001/XMLSchema](http://www.w3.org/2001/XMLSchema)">
<getresidenttransactionResponse xmlns="[http://tempuri.org/](http://tempuri.org/)">
<getresidenttransactionResult>
<OpenTransactions xmlns="">
<OpenTransaction>
<LeaID>52859</LeaID>
<ReshID>651</ReshID>
<SiteID>3936120</SiteID>
<UnitID>100</UnitID>
<PropertyNumberId>1</PropertyNumberId>
<PropertyNumber>77643</PropertyNumber>
<CatCode>C</CatCode>
<TransName>RENT</TransName>
<TransDesc>GR changed RENT to 411.00</TransDesc>
<TransCodeDesc>Rent</TransCodeDesc>
<TransAmt>350.00</TransAmt>
<ldtID>264119</ldtID>
<TransactionDate>2023-03-01 00:00:00.000</TransactionDate>
<SubJournal>RESIDENT</SubJournal>
<Grouptorent>N</Grouptorent>
</OpenTransaction>
<OpenTransaction>
<LeaID>52859</LeaID>
<ReshID>651</ReshID>
<SiteID>3936120</SiteID>
<UnitID>100</UnitID>
<PropertyNumberId>1</PropertyNumberId>
<PropertyNumber>77643</PropertyNumber>
<CatCode>P</CatCode>
<TransName>HAPPD</TransName>
<TransDesc>HAP Payment</TransDesc>
<TransCodeDesc>Payment By Subsidy</TransCodeDesc>
<TransAmt>1014.00</TransAmt>
<ldtID>264926</ldtID>
<TransactionDate>2023-04-12 00:00:00.000</TransactionDate>
<SubJournal>SUBSIDY</SubJournal>
<Grouptorent>N</Grouptorent>
</OpenTransaction>
</OpenTransactions>
</getresidenttransactionResult>
</getresidenttransactionResponse>
</s:Body>
</s:Envelope>
`;

module.exports = {
    getResidentTransactionsRequestJSON,
    getResidentTransactionsResponseXML
}