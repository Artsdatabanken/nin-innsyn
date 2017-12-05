import React from 'react';
//import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
//import App from './App';
import backend from './backend'
import Omrader from './Naturområdedetaljer/Omrader'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const dummyNatureArea = {"uniqueId":{"localId":"3e9bdc8b-3b7a-490c-bac6-ac5d3b0ccf27","nameSpace":"NO.MILJODIREKTORATET.NIN","versionId":"2.1"},"areas":[{"type":2,"name":"Oppland"},{"type":1,"name":"Sel"},{"type":3,"name":"Rondane"}],"area":"POLYGON ((225023.80999999959 6869587.7600000016, 225046.88999999967 6869567.6099999994, 225052.74000000022 6869555.98, 225048.71999999974 6869542.4899999984, 225014.73000000045 6869534.5599999987, 224993.21999999974 6869526.8500000015, 224981.8200000003 6869508.5, 224980.04000000004 6869489.27, 224966.78000000026 6869480.7899999991, 224955.66000000015 6869480.4400000013, 224948.66999999993 6869479.6999999993, 224937.3200000003 6869491.84, 224942.23000000045 6869514.9400000013, 224946.01999999955 6869540.9200000018, 224937.41999999993 6869552.8000000007, 224897.80999999959 6869544, 224871.54999999981 6869529.8099999987, 224835.54000000004 6869515.129999999, 224800.13999999967 6869492.0799999982, 224779.50999999978 6869478.7399999984, 224770.12000000011 6869467.1400000006, 224746.25 6869463.8099999987, 224704.90000000037 6869466.25, 224678.61000000034 6869436.82, 224663.21999999974 6869420.23, 224640.84999999963 6869418.1400000006, 224618.87000000011 6869420.18, 224598.70999999996 6869397.1000000015, 224613.54999999981 6869377.7100000009, 224624.63999999967 6869362.82, 224653.95000000019 6869335.16, 224681.91000000015 6869322.870000001, 224723.25999999978 6869320.43, 224754.87000000011 6869317.5, 224786.33999999985 6869313.1999999993, 224808.29999999981 6869295.9200000018, 224823.41000000015 6869294.52, 224819.00999999978 6869276.91, 224806.24000000022 6869258.6900000013, 224774 6869254.75, 224744.50999999978 6869250.5500000007, 224732.84999999963 6869229.4600000009, 224724.29999999981 6869196.9899999984, 224722.76999999955 6869180.5, 224724.25 6869166.5100000016, 224748.59999999963 6869160.09, 224762.8200000003 6869149.07, 224739.55999999959 6869137.370000001, 224721.3200000003 6869134.8999999985, 224695.46999999974 6869140.07, 224661.13999999967 6869158.5, 224634.6799999997 6869172.0300000012, 224607.34999999963 6869191.1999999993, 224583.54000000004 6869218.3500000015, 224570.08000000007 6869237.6099999994, 224575.08999999985 6869246.8500000015, 224608.79999999981 6869236.7899999991, 224621.53000000026 6869224.5300000012, 224643.23000000045 6869204.5, 224668.08999999985 6869203.5799999982, 224689.36000000034 6869223.7899999991, 224699.38999999967 6869242.2600000016, 224706.16000000015 6869255.4899999984, 224704.6799999997 6869269.4899999984, 224679.59999999963 6869282.8999999985, 224673.36000000034 6869290.3999999985, 224654.53000000026 6869311.5500000007, 224631.33000000007 6869330.3299999982, 224594.36000000034 6869335.1400000006, 224584.37999999989 6869347.1499999985, 224575.04999999981 6869366.0300000012, 224568.58000000007 6869386.0300000012, 224551.23000000045 6869393.18, 224554.63999999967 6869415.0399999991, 224553.16999999993 6869429.0399999991, 224536.0700000003 6869438.9400000013, 224543.21999999974 6869456.2899999991, 224562.09999999963 6869465.629999999, 224588.71999999974 6869468.6999999993, 224593.0700000003 6869455.8299999982, 224600.65000000037 6869432.9499999993, 224625.12999999989 6869427.91, 224654.00999999978 6869440.48, 224663.78000000026 6869456.2100000009, 224673.54999999981 6869471.93, 224685.20999999996 6869493.02, 224703.48000000045 6869510.73, 224712.49000000022 6869518.2100000009, 224730.5 6869533.1700000018, 224757.98000000045 6869530.629999999, 224792.96999999974 6869534.32, 224814.37000000011 6869555.8900000006, 224819.88999999967 6869570.620000001, 224814.6799999997 6869589.120000001, 224815.71999999974 6869615.3599999994, 224809.62000000011 6869624.2399999984, 224804.53000000026 6869644.1099999994, 224810.55999999959 6869664.34, 224823.84999999963 6869688.0500000007, 224835.5 6869709.1499999985, 224852.26999999955 6869725.6099999994, 224876.90000000037 6869737.1900000013, 224907 6869733.0100000016, 224936.24000000022 6869734.4600000009, 224942.78000000026 6869760.18, 224935.80999999959 6869774.6900000013, 224931.45999999996 6869787.5599999987, 224934.11000000034 6869801.18, 224966.86000000034 6869810.6099999994, 224989.45000000019 6869800.2100000009, 224995.88999999967 6869764.9600000009, 225009.08999999985 6869742.9499999993, 225023.44000000041 6869733.3099999987, 225031.53000000026 6869715.93, 225034.12999999989 6869699.0599999987, 225021.86000000034 6869686.34, 225005.46999999974 6869674, 225001.0700000003 6869656.3900000006, 225013.66000000015 6869642.75, 225037.66000000015 6869647.4600000009, 225056.66999999993 6869658.1700000018, 225067.4299999997 6869669.6400000006, 225073.54000000004 6869660.7600000016, 225077.25 6869641.02, 225093.25999999978 6869649.23, 225110.50999999978 6869655.9499999993, 225124.48000000045 6869642.18, 225128.5700000003 6869626.5599999987, 225122.5700000003 6869621.57, 225099.95000000019 6869616.7399999984, 225090.29999999981 6869602.3900000006, 225082.03000000026 6869587.91, 225069.03000000026 6869582.1900000013, 225057.78000000026 6869580.4600000009, 225042.05999999959 6869590.23, 225044.20000000019 6869598.3500000015, 225059.20999999996 6869610.8099999987, 225062.71999999974 6869618.8000000007, 225043.48000000045 6869620.5799999982, 225029.24000000022 6869616.3599999994, 225007.88999999967 6869625.27, 224994.15000000037 6869626.5399999991, 224973.41000000015 6869627.0799999982, 224946.91999999993 6869625.370000001, 224923.28000000026 6869609.5500000007, 224925.13999999967 6869599.68, 224953.99000000022 6869597, 224969.62000000011 6869601.1000000015, 224973.33000000007 6869581.3500000015, 224976.8200000003 6869574.1000000015, 224996.94000000041 6869581.9400000013, 225003.20000000019 6869589.6700000018, 225023.80999999959 6869587.7600000016))","surveyer":null,"documents":[],"parameters":[{"surveyer":{"company":"Miljødirektoratet","contactPerson":"kjepet (Kjetil Pettersson)","email":"kjetil.pettersson@miljodir.no","phone":"92605760","homesite":null},"customVariables":[],"additionalVariables":[],"share":10.0,"code":"NA_V1-C-1","surveyed":null,"codeDescription":"svært og temmelig kalkfattige myrflater","codeUrl":null,"mainTypeCode":"NA_V","mainTypeDescription":"Våtmarkssystemer","mainTypeCodeUrl":"http://data.artsdatabanken.no/Pages/172028"}],"rødlisteKategori":{"id":7,"code":"LC","vurderingsenhet":null},"institution":"Miljødirektoratet","count":0,"version":"2.1","nivå":4,"surveyed":"2014-08-10T00:00:00","description":"V06.4-6_BK kalkfattig myr (tidligere prosjektvariabel som omfattet tue, fastmatte og mykmatte utforminger i en \"prosjektgrunntype\"). Tek endret til fastmatte. Kan evt feltsjekkes. Rondvassbu."};
const dummyMeta = {"uniqueId":{"localId":"dba397ac-d6dd-4f23-a9d6-56f0ef17774d","nameSpace":"NO.MILJODIREKTORATET.NIN","versionId":"2.1"},"contractor":{"company":null,"contactPerson":null,"email":null,"phone":null,"homesite":null},"owner":{"company":"Miljødirektoratet","contactPerson":"kjepet (Kjetil Pettersson)","email":"kjetil.pettersson@miljodir.no","phone":"92605760","homesite":null},"area":"MULTIPOLYGON (((123175.45999999996 6828319.2100000009, 123285.58000000008 6828267.3900000006, 67016.280000000261 6991944.2899999991, 67010.75 6991955.8299999982)))","quality":{"measuringMethod":"Digitalisert på skjerm fra ortofoto","accuracy":null,"visibility":null,"measuringMethodHeight":null,"accuracyHeight":null,"maxDeviation":null},"documents":[],"natureAreas":[],"variabelDefinitions":[],"program":"Kartlegging 2011-2015","projectName":"Basiskartlegging i verneområder","projectDescription":"Kartlegging 2011-2015 i NIN 1.0, konvertert til 2.1. Basiskartlegging i verneområder","purpose":null,"surveyedFrom":"2011-06-01T00:00:00","surveyedTo":"2015-12-15T00:00:00","surveyScale":"1:5000","resolution":null};

jest.mock("./backend", () => ({
    getToken: jest.fn(),
    getNatureAreaByLocalId: jest.fn(),
    getMetadataByNatureAreaLocalId: jest.fn(),
    getAreaSummary: jest.fn(),
}));

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

it("renders without crashing", () => {
    backend.getNatureAreaByLocalId.mockImplementation(
        success => new Promise((resolve, reject) => resolve(dummyNatureArea))
    );
    backend.getMetadataByNatureAreaLocalId.mockImplementation(
        success => new Promise((resolve, reject) => resolve(dummyMeta))
    );
    renderer.create(
        <MuiThemeProvider>
            <Omrader areas={dummyNatureArea.areas} />
        </MuiThemeProvider>

    );
    //expect(backend.getNatureAreaByLocalId.mock.calls).toHaveLength(1);
});