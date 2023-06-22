/* example of how to detect location and area by IPaddress using JS (convert ip to location) */
/* Required before run you can only test it on console in https://lite.ip2location.com/china-ip-address-ranges (or you can provide your data and fill up ranges array with your own data or use scraper to get all other countries first and assign the data to ranges value and start run without scraping in your web app  */
function getLocationByIP(ipAddress){
    let result = {};
    // get list of vaild ips ranges 
    const chinnaIpsRanges = Array.from($("tbody tr")).map( (row)=>{
    let index = 0;
    const tdOptions = ['begin', 'end', 'total'];
    const tds = Array.from($(row).find('td')).map( (tdElm)=>{return $(tdElm).text();});
    let obj = {};
    tds.forEach( (tdTxt, i)=>{
        if (i > tdOptions.length){
           index = 0;
        }
        obj[tdOptions[index]] = tdTxt;
        index += 1;
    });

    return obj;
});
    const ranges = [{name: 'china', data: chinnaIpsRanges}];
    
    for (let r=0; r<ranges.length; r++ ){
       const currentCountry = ranges[r];
       for (let i=0; i< currentCountry.data.length; i++){
           const arreaGroupRangeObj = currentCountry.data[i];           
           let inThisCountryRange = true;
           try {
             let ipParameterList = String(ipAddress).trim().split(".");
             let ipAreaGroupBeginList = String(arreaGroupRangeObj.begin).trim().split(".");
             let ipAreaGroupEndList = String(arreaGroupRangeObj.end).trim().split(".");

             if (ipParameterList.length == ipAreaGroupBeginList.length && ipAreaGroupBeginList.length == ipAreaGroupEndList.length){
                 for (let ipI=0; ipI < ipAreaGroupEndList.length; ipI++){
                     const ipParameterPart = Number(ipParameterList[ipI]);
                     const ipAreaGroupBeginPart = Number(ipAreaGroupBeginList[ipI]);
                     const ipAreaGroupEndPart = Number(ipAreaGroupEndList[ipI]);
let vaildPart = ipParameterPart >= ipAreaGroupBeginPart && ipParameterPart <= ipAreaGroupEndPart && ipParameterPart < 255;
                     if (!vaildPart){
                         console.log("invalid", 0 >= 0 && 0 <= 0);
                         inThisCountryRange = false;
                         break;

                     }                     
                 }
                 
             } else {
                 inThisCountryRange = false;
             }
           } catch (error){
             console.log(error, 'error');             
             inThisCountryRange = false;
             break;
           }
           if (!inThisCountryRange){
               continue;
           } else {
               console.log(currentCountry.name);
               return arreaGroupRangeObj;
           }
           
       }
    }
    return result;
};
getLocationByIP("1.1.2.254")
/* 
  result example with found location
  getLocationByIP("1.1.2.254")
  (4) invalid area
  china
  {begin: '1.1.2.0', end: '1.1.63.255', total: '15,872'}
*/
