import 'main/index.scss';
import { getLegend, getSwitchesLong, getSwitchesShort, getText } from './svgDrawer';
import * as plotly from 'plotly.js-dist/plotly.js';

let plotDiv = ['div'];
    
export function plot(data, args, layout, config) {
    console.log(data)
    let asduAddress = data[0].split(';')[0]
    
    let allData = {
        0:[],
        1:[],
        2:[],
        3:[],
        4:[],
    }
    // saving each io address in its own array
    for(let dataEach of data){
        let ioFromData = parseInt(dataEach.split(';')[3])
        allData[ioFromData].push(dataEach)
    }
    console.log('all data: ', allData)

    let format_data = []
    for(let i = 0; i < 5; i++){
        let dataForEachIo = allData[i]
        
        if(dataForEachIo.length == 0){
            continue
        }

        console.log('dataForEachIo: ' ,dataForEachIo)
        let xCoords = []
        let yCoords = []
        for(let dataArrayElem of dataForEachIo){
            let dataSplitted = dataArrayElem.split(';')
            xCoords.push(dataSplitted[2])
            yCoords.push(dataSplitted[1])
        }

        let format_data_each = {
            x: xCoords, // time values
            y: yCoords, // simulator values
            type: 'scatter', 
            name: `${args[i+1]}`, // trace name from args

        }       
        format_data.push(format_data_each)
    }

    console.log('plot data: ', format_data)

    layout = {title: `Asdu address: ${asduAddress}`};

    return ['div.plot', {
        plotData: format_data,
        hook: {
            insert: vnode => plotly.newPlot(vnode.elm, format_data, layout, config),
            update: (oldVnode, vnode) => {
                if (u.equals(oldVnode.data.plotData, vnode.data.plotData)) return;
                plotly.react(vnode.elm, format_data, layout, config);
            },
            destroy: vnode => plotly.purge(vnode.elm)
        }}
    ];
}



function changeState(changedSwitch){
    console.log(`hit switch number: ${changedSwitch}`);

    let changedSwitchValue = r.get('remote', 'adapter', changedSwitch, 0, "value");

    if(changedSwitchValue === 'ON'){
        changedSwitchValue = 'OFF';
    } else {
        changedSwitchValue = 'ON';
    }
    hat.conn.send('adapter', {asdu: changedSwitch,
                              value: changedSwitchValue});
}


function changeTableVisibility(chosenElement){
    // getting data value to find which(if any element was visible)
    let tableValue = r.get('data', 'table_visible')
    console.log('table value for asdu address: ', chosenElement, ' is: ', tableValue)

    // closing table by clicking the same element twice
    if(tableValue === chosenElement){
        r.set(['data', 'table_visible'], undefined)
        return
    }
    // saving the chosen element as visible 
    r.set(['data', 'table_visible'], chosenElement)
    // show db data for chosenElement
    hat.conn.send('db_adapter', {
        'asdu': chosenElement,
    })

}


// each time vt() starts it needs to check if any table needs to be drawn
function checkTableAndPlotDrawability() {
    // finding if any asduAddress is saved as true
    let asduAddress = r.get('data', 'table_visible');
    // returns empty div, nothing is being drawn
    if(asduAddress === undefined){
        return ['div'];
    }
    console.log('asdu', asduAddress);
    

    // all table elements are saved into a tableDiv array
    let tableDiv = ['table'];
    let tableContent
    // split by asduAddress which asdu needs to be drawn
    if (asduAddress < 10){
        tableContent = drawTableAndPlot(asduAddress, 
                                        2,
                                        "BUS",
                                        "Active power [MW]", 
                                        "Reactive power [MVar]");
    }  else if (asduAddress < 20){
        tableContent = drawTableAndPlot(asduAddress, 
                                        5, 
                                        "LINE",
                                        "Active power at line start [MW]", 
                                        "Reactive power at line start [MVar]", 
                                        "Active power at line end [MW]", 
                                        "Reactive power at line end [MVar]", 
                                        "Load [%]");
    } else if (asduAddress == 20){
        tableContent = drawTableAndPlot(asduAddress, 
                                        5, 
                                        "TRANSFORMER",
                                        "Active power on higher voltage side[MW]", 
                                        "Reactive power on higher voltage side [MVar]",
                                        "Active power on lower voltage side[MW]", 
                                        "Reactive power on higher voltage side [MVar]",
                                        "Load [%]");
    } else {
        tableContent = drawTableAndPlot(asduAddress,
                                        1,
                                        "SWITCH",
                                        "ON/OFF");
    }   

    // elements are return as an array of arrays
    for(let listElem of tableContent){
        tableDiv.push(listElem);
    }
    console.log('Json tablice:',JSON.stringify(tableDiv))
    return tableDiv;
}

// if the table needs to be drawn, we first write the headers and which element was chosen
// also writes all values on each IO address in a separate row
function drawTableAndPlot(asduAddress, ioNumber, ...args) {

    let plotDataRaw = r.get('remote', 'db_adapter', 'plot_data')
    console.log('db:', plotDataRaw)

    if(plotDataRaw !== undefined && plotDataRaw !== []) {
        let outputPlot = plot(plotDataRaw, args)
        plotDiv = outputPlot;
    }
    
    // total data from the function
    let outputTable = []
    
    // first row is for the headers given in ...args
    let namesRow = ['tr'];
    for (let i = 0; i < args.length; i++) {
        namesRow.push(['th', args[i]]);
    }
    outputTable.push(namesRow);

    // second row is for the values from r.get() function
    let valuesRow = ['tr'];
    valuesRow.push(['td', String(asduAddress)])

    for (let i = 0; i < ioNumber; i++) {
        let valueFromArray = r.get('remote', 'adapter', asduAddress, i, "value");
        valuesRow.push(['td', String(valueFromArray)])
    }
    
    outputTable.push(valuesRow);
    return outputTable;
}

// all text and their respected values and location is saved in an array of objects
// some settings are used on all text elements while their location, colour and text varies
function writeText() {
    let outputText = 
    ['g', getText().map(textData => ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
        ['switch',
            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                ['div', {'attrs': {'style': `display: flex; align-items: unsafe center; justify-content: unsafe ${textData["justify"]}; width: ${textData["width"]}px; height: 1px; padding-top: ${textData["padding"]}px; margin-left: ${textData["margin"]}px;`}},
                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center;'}},
                        ['div', {'attrs': {'style': `display: inline-block; font-size: 12px; font-family: Helvetica; color: ${textData["color-fill"]}; line-height: 1.2; pointer-events: none; white-space: normal; word-wrap: normal; `}}, `${textData["text"]}`]]]],
            ['text', {'attrs': {'x': `${textData["x"]}`, 'y': `${textData["padding"]+4}`, 'fill': `${textData["color-fill"]}`, 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, `${textData["text"]}`]]])];
    
    return outputText;
}

function writeLegend(){
    let legendOutput = getLegend().map(legendData =>
        ['rect', {'attrs': {'x': '93', 'y': `${legendData["y"]}`, 'width': '20', 'height': '20', 'fill': `${legendData["fill"]}`, 'stroke': '#000000', 'pointer-events': 'none'}}]
    )
    return legendOutput
}

function writeLongSwitches(){
    let longSwitchOutput = getSwitchesLong().map(switchData => 
            [['rect', {'attrs': {'x': `${switchData["x"]}`, 'y': '120', 'width': '30', 'height': '30', 'fill': '#ffffff', 'stroke': '#ffffff'}, on : { click: () => changeState(`${switchData["asdu"]}`)}}],
            ['path', {'attrs': {'d': `M ${switchData["x"]-24} 140 L ${switchData["x"]} 140`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
            ['path', {'attrs': {'d': `M ${switchData["x"]} 140 L ${switchData["x"]+24} ${r.get('remote', 'adapter', `${switchData["asdu"]}`, 0, "value") == "OFF" ? 130 : 139}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}}],
            ['path', {'attrs': {'d': `M ${switchData["x"]+56} 140 L ${switchData["x"]+24} 140`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}]]
        );
    
    return longSwitchOutput;
}


function writeShortSwitches(){
    let shortSwitchOutput = getSwitchesShort().map(switchData => 
            [['rect', {'attrs': {'x': `${switchData["x"]}`, 'y': `${switchData["y"]}`, 'width': '18', 'height': '30', 'fill': '#ffffff', 'stroke': '#ffffff'}, on : { click: () => changeState(`${switchData["asdu"]}`)}}],
            ['path', {'attrs': {'d': `M ${switchData["x"]-10} ${switchData["y"]+20} L ${switchData["x"]+2} ${switchData["y"]+20}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
            ['path', {'attrs': {'d': `M ${switchData["x"]+2} ${switchData["y"]+20} L ${switchData["x"]+14} ${r.get('remote', 'adapter', `${switchData["asdu"]}`, 0, "value") == "OFF" ? `${switchData["y"]+10}` : `${switchData["y"]+19}`}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}}],
            ['path', {'attrs': {'d': `M ${switchData["x"]+30} ${switchData["y"]+20} L ${switchData["x"]+14} ${switchData["y"]+20}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}]]
        );
    console.log(shortSwitchOutput)
    return shortSwitchOutput;
}

function getLines() {
    let legendRects = writeLegend()
    let longSwitches = writeLongSwitches()
    let shortSwitches = writeShortSwitches()

    return ['g',
                    //title
                    ['text', {'attrs': {'x': '200', 'y': '40', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '30px', 'text-anchor': 'middle'}}, 'IEC 60870-5-104'],

                    ['path', {'attrs': {'d': 'M 53 140 L 15.24 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}}],
                    ['path', {'attrs': {'d': 'M 27.12 133.5 L 14.12 140 L 27.12 146.5', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'all'}}],
                    ['path', {'attrs': {'d': 'M 93 180 L 93 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}, on : { click: () => changeTableVisibility(0)}}],
                    ['path', {'attrs': {'d': 'M 93 140 L 53 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}}],
                    ['path', {'attrs': {'d': 'M 93 140 L 207.76 140', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}, on : { click: () => changeTableVisibility(10)}}],
                    ['path', {'attrs': {'d': 'M 210.76 140 L 206.76 142 L 207.76 140 L 206.76 138 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 	'stroke-miterlimit': '10', 'pointer-events': 'all'}}],
                    ['path', {'attrs': {'d': 'M 213 180 L 213 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}, on : { click: () => changeTableVisibility(1)}}],
                    ['path', {'attrs': {'d': 'M 293 180 L 293 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(2)}}],
                    ['rect', {'attrs': {'x': '320.2', 'y': '230', 'width': '25.6', 'height': '10', 'fill': '#ffffff', 'stroke': '#000000', 'transform': 'rotate(90,333,235)', 	'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 313 235 L 320.2 235 M 345.8 235 L 353 235', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'transform': 	'rotate(90,333,235)', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '329', 'cy': '235', 'rx': '2', 'ry': '2.5', 'fill': 'none', 'stroke': '#000000', 'transform': 'rotate(90,333,235)', 	'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '337', 'cy': '235', 'rx': '2', 'ry': '2.5', 'fill': 'none', 'stroke': '#000000', 'transform': 'rotate(90,333,235)', 	'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 333 215 L 333.03 170 L 293 170', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 333 255 L 333 270', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 313 270 L 353 270', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 318 275 L 348 275', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 323 280 L 343 280', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //trafo
                    ['rect', {'attrs': {'x': '312', 'y': '115', 'width': '80', 'height': '50', 'fill': '#ffffff', 'stroke': '#ffffff'}, on : { click: () => changeTableVisibility(20)}}],
                    ['ellipse', {'attrs': {'cx': '337.78', 'cy': '140', 'rx': '21.73913043478261', 'ry': '20', 'fill': 'none', 'stroke': '#000000'}}],
                    ['ellipse', {'attrs': {'cx': '368.22', 'cy': '140', 'rx': '21.73913043478261', 'ry': '20', 'fill': 'none', 'stroke': '#000000'}}],
                    ['path', {'attrs': {'d': 'M 303 140 L 316.04 140 M 389.96 140 L 403 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 	'none'}}],
                    ['path', {'attrs': {'d': 'M 303 140 L 293 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 493 260 L 493 20', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(4)}}],
                    ['path', {'attrs': {'d': 'M 533 60 L 607.76 60', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(11)}}],
                    ['path', {'attrs': {'d': 'M 610.76 60 L 606.76 62 L 607.76 60 L 606.76 58 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': 	'10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 538.24 220 L 613 220', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(13)}}],
                    ['path', {'attrs': {'d': 'M 535.24 220 L 539.24 218 L 538.24 220 L 539.24 222 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 	'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 653 120 L 653 40', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(5)}}],
                    ['path', {'attrs': {'d': 'M 653 240 L 653 160', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(6)}}],
                    ['path', {'attrs': {'d': 'M 607.76 180 L 593.03 180 L 593.03 100 L 613 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(12)}}],
                    ['path', {'attrs': {'d': 'M 610.76 180 L 606.76 182 L 607.76 180 L 606.76 178 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 	'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 653 80 L 683 80', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '693', 'cy': '80', 'rx': '10', 'ry': '10', 'fill': '#ffffff', 'stroke': '#000000', 'pointer-events': 'none'}}],

                    ['path', {'attrs': {'d': 'M 653 180 L 683 180', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '693', 'cy': '180', 'rx': '10', 'ry': '10', 'fill': '#ffffff', 'stroke': '#000000', 'pointer-events': 'none'}}],

                    ['path', {'attrs': {'d': 'M 653 220 L 700.76 220', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 688.88 226.5 L 701.88 220 L 688.88 213.5', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 	'none'}}],
                    ['path', {'attrs': {'d': 'M 413 180 L 413 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10'}, on : { click: () => changeTableVisibility(3)}}],
                    ['path', {'attrs': {'d': 'M 413 140 L 403 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    longSwitches,

                    shortSwitches,

                    legendRects
                         
    ];
}


// main function which rerenders the pages and it's values every three seconds.
export function vt() {
    console.log("ping")
    // prevents undefined text on screen
    if (!(r.get('remote'))){
        return ['div'];
    }
    plotDiv = ['div'];
    // draws the table and plot if it needs to be drawn
    let tableDiv = checkTableAndPlotDrawability()

    //draws text every time, saves many lines of duplicated code
    let textDiv = writeText()

    let linesDiv = getLines();

    return  ['div.main',
                // svg 
                ['svg', {'attrs': {'version': '1.1', 'width': '1700px', 'height': '800px', 'viewBox': '-0.5 -0.5 774 302', 'style': 'background-color: rgb(255, 255, 255);'}},
                    linesDiv,
                    // text div is already in it's 'g' container
                    textDiv,
                ],
                // table
                ['div.table_div',
                    tableDiv
                ],
                // plot
                ['div.class5',
                    plotDiv
                ],
            ];
}
