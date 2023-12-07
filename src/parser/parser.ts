import { parse } from 'node-html-parser';

interface IParseObj {
    Company: string
    Expired: string
}

const Parser = (res: string) => {
    try {
      const root = parse(res);
  
      const getCompany = root
        .querySelector(".search-result-data>.search-company>img")
        ?.getAttribute("title");
      const getDates = root.querySelector(
        ".search-result-data>.search-date-expired"
      );

      var DateObj = ""
        var CompanyObj = ""

      if (getDates !== null && getCompany !== null) {

          DateObj = getDates.childNodes[0].toString();
          CompanyObj = getCompany!.toString();
      }

      const parsed: IParseObj = {
        Company: CompanyObj,
        Expired: DateObj
      }
      
      return parsed

    } catch (err) {

        const parsed: IParseObj = {
            Company: '',
            Expired: ''
          }

        return parsed
    }
  };


  export default Parser;