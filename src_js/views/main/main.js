import 'main/index.scss';

// function testFunction(i){
//     console.log(`Hello i pressed ${i}. button`);
// }

function changeState(changedSwitch){
    console.log("pogodio")
    let changedSwitchValue = r.get('remote', 'adapter', 'switch', changedSwitch, "value");
    console.log(changedSwitchValue)
    console.log( 1- changedSwitchValue)

    // r.set(['remote', 'adapter', 'switch', changedSwitch, "value"], 1-changedSwitchValue);
    hat.conn.send('adapter', {asdu: changedSwitch+30, value: 1 - changedSwitchValue });

    //console.log('AAAAAAAAAAAAAA',switchArrayFun)
    //let switchToChange = JSON.parse(switchArrayFun[changedSwitch]);

    //switchToChange["value"] = 1 - switchToChange["value"];
    //switchToChange["cause"] = "REQUEST";

    //switchArrayFun[changedSwitch] = JSON.stringify(switchToChange);
    //console.log('BBBBBBBBBBBBBBBBBBBBBBBb',switchArrayFun)

}

export function vt() {
    console.log("ping")
    if (!(r.get('remote'))){
        return ['div'];
    }
    let busArray = r.get('remote', 'adapter', 'bus');
    let lineArray = r.get('remote', 'adapter', 'line');
    let transformer = r.get('remote', 'adapter', 'transformer');
    let switchArray = r.get('remote', 'adapter', 'switch');
    // console.log(JSON.stringify(busArray))
    // console.log(lineArray)
    // console.log(transformer)
    // console.log(switchArray)

    // let idk = r.get('remote', 'adapter', 'switch', 1, "value");
    // console.log(idk)

    
    // let bus = []
    // for(let i = 0; busArray.length; i++){
    //     bus[i] = busArray[]
    // }
    // let thirdswitch = undefined;
    // if(switchArray != undefined){
    //     //console.log(switchArray);
    //     // console.log(typeof(switchArray));
    //     thirdswitch = (JSON.parse(switchArray[3]))["value"];
    //     //console.log(thirdswitch);
    // }
    // console.log('aaaaaaaaaaaaaaaaa2' + thirdswitch)
    // console.log('aaaaaaaaaaaaaaaaa3' + typeof(thirdswitch))
    // console.log('aaaaaaaaaaaaaaaaa4' + busArray)
    // console.log('aaaaaaaaaaaaaaaaa5' + transformerJson)
    // let busArray = undefined
    // if(busArray != undefined){
    //     busArray = JSON.parse(busArray)
    // }
    //console.log(busArray)
    // for(let each in busArray){
    //     let data = JSON.parse(each)
    //     //console.log(data)
    // }

    return ['div.main',
            ['div.class1',`bus: ${JSON.stringify(busArray)}`],
            ['div.class2',`line: ${JSON.stringify(lineArray)}`],
            ['div.class3',`transformer:  ${JSON.stringify(transformer)}`],
            ['div.class4',`switch: ${JSON.stringify(switchArray)}`],
            ['svg', {'attrs': {'version': '1.1', 'width': '774px', 'height': '302px', 'viewBox': '-0.5 -0.5 774 302', 'style': 'background-color: rgb(255, 255, 255);'}},
                ['g',
                    ['path', {'attrs': {'d': 'M 53 140 L 15.24 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}}],
                    ['path', {'attrs': {'d': 'M 27.12 133.5 L 14.12 140 L 27.12 146.5', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'all'}}],
                    ['path', {'attrs': {'d': 'M 93 180 L 93 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}}],
                    ['path', {'attrs': {'d': 'M 93 140 L 53 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}}],
                    ['path', {'attrs': {'d': 'M 93 140 L 207.76 140', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10', 'pointer-events': 'stroke'}}],
                    ['path', {'attrs': {'d': 'M 210.76 140 L 206.76 142 L 207.76 140 L 206.76 138 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 	'stroke-miterlimit': '10', 'pointer-events': 'all'}}],
                    ['path', {'attrs': {'d': 'M 213 180 L 213 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 	'stroke'}}],
                    ['path', {'attrs': {'d': 'M 213 140 L 237 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    // switch0
                    ['path', {'attrs': {'d': `M 237 140 L 261 ${switchArray[0]["value"] == 0 ? 130 : 139}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(0)}}],

                    ['path', {'attrs': {'d': 'M 293 140 L 261 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 293 180 L 293 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['rect', {'attrs': {'x': '320.2', 'y': '230', 'width': '25.6', 'height': '10', 'fill': '#ffffff', 'stroke': '#000000', 'transform': 'rotate(90,333,235)', 	'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 313 235 L 320.2 235 M 345.8 235 L 353 235', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'transform': 	'rotate(90,333,235)', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '329', 'cy': '235', 'rx': '2', 'ry': '2.5', 'fill': 'none', 'stroke': '#000000', 'transform': 'rotate(90,333,235)', 	'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '337', 'cy': '235', 'rx': '2', 'ry': '2.5', 'fill': 'none', 'stroke': '#000000', 'transform': 'rotate(90,333,235)', 	'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 333 215 L 333.03 170 L 293 170', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 333 255 L 333 270', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 313 270 L 353 270', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 318 275 L 348 275', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 323 280 L 343 280', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '337.78', 'cy': '140', 'rx': '21.73913043478261', 'ry': '20', 'fill': 'none', 'stroke': '#000000', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '368.22', 'cy': '140', 'rx': '21.73913043478261', 'ry': '20', 'fill': 'none', 'stroke': '#000000', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 303 140 L 316.04 140 M 389.96 140 L 403 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 	'none'}}],
                    ['path', {'attrs': {'d': 'M 303 140 L 293 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 493 260 L 493 20', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 533 60 L 607.76 60', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10', 'pointer-events': 	'none'}}],
                    ['path', {'attrs': {'d': 'M 610.76 60 L 606.76 62 L 607.76 60 L 606.76 58 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': 	'10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 538.24 220 L 613 220', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10', 'pointer-events': 	'none'}}],
                    ['path', {'attrs': {'d': 'M 535.24 220 L 539.24 218 L 538.24 220 L 539.24 222 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 	'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 653 120 L 653 40', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 653 240 L 653 160', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10'}}],
                    ['path', {'attrs': {'d': 'M 607.76 180 L 593.03 180 L 593.03 100 L 613 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '2', 'stroke-miterlimit': '10', 	'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 610.76 180 L 606.76 182 L 607.76 180 L 606.76 178 Z', 'fill': '#000000', 'stroke': '#000000', 'stroke-width': '2', 	'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 653 80 L 683 80', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '693', 'cy': '80', 'rx': '10', 'ry': '10', 'fill': '#ffffff', 'stroke': '#000000', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 18px; 	height: 1px; padding-top: 80px; margin-left: 684px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'G']]]],

                            ['text', {'attrs': {'x': '693', 'y': '84', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'G']]],

                    ['path', {'attrs': {'d': 'M 653 180 L 683 180', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['ellipse', {'attrs': {'cx': '693', 'cy': '180', 'rx': '10', 'ry': '10', 'fill': '#ffffff', 'stroke': '#000000', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 18px; 	height: 1px; padding-top: 180px; margin-left: 684px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'G']]]],
                            ['text', {'attrs': {'x': '693', 'y': '184', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'G']]],

                    ['path', {'attrs': {'d': 'M 653 220 L 700.76 220', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 688.88 226.5 L 701.88 220 L 688.88 213.5', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 	'none'}}],
                    ['path', {'attrs': {'d': 'M 413 180 L 413 100', 'fill': 'none', 'stroke': '#000000', 'stroke-width': '5', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 413 140 L 403 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    ['path', {'attrs': {'d': 'M 413 140 L 437 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //switch1
                    ['path', {'attrs': {'d': `M 437 140 L 461 ${switchArray[1]["value"] == 0 ? 130 : 139}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(1)}}],

                    ['path', {'attrs': {'d': 'M 493 140 L 461 140', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 90px; margin-left: 74px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '0']]]],
                            ['text', {'attrs': {'x': '93', 'y': '94', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '0']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 90px; margin-left: 194px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '1']]]],
                            ['text', {'attrs': {'x': '213', 'y': '94', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '1']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 90px; margin-left: 274px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '2']]]],
                            ['text', {'attrs': {'x': '293', 'y': '94', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '2']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 90px; margin-left: 394px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '3']]]],
                            ['text', {'attrs': {'x': '413', 'y': '94', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '3']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 10px; margin-left: 474px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '4']]]],

                            ['text', {'attrs': {'x': '493', 'y': '14', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '4']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 30px; margin-left: 634px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '5']]]],
                            ['text', {'attrs': {'x': '653', 'y': '34', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '5']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 150px; margin-left: 634px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '6']]]],
                        ['text', {'attrs': {'x': '653', 'y': '154', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '6']]],

                    ['rect', {'attrs': {'x': '93', 'y': '220', 'width': '20', 'height': '20', 'fill': '#000000', 'stroke': '#000000', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe flex-start; width: 	38px; height: 1px; padding-top: 230px; margin-left: 125px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: left; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Bus ID']]]],

                            ['text', {'attrs': {'x': '125', 'y': '234', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px'}}, 'Bus ID']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 130px; margin-left: 134px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #FF0000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '0']]]],
                            ['text', {'attrs': {'x': '153', 'y': '134', 'fill': '#FF0000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '0']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 		'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 50px; 	margin-left: 554px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #FF0000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '1']]]],
                            ['text', {'attrs': {'x': '573', 'y': '54', 'fill': '#FF0000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '1']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 210px; margin-left: 554px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #FF0000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '3']]]],
                            ['text', {'attrs': {'x': '573', 'y': '214', 'fill': '#FF0000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '3']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 135px; margin-left: 564px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #FF0000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '2']]]],
                            ['text', {'attrs': {'x': '583', 'y': '139', 'fill': '#FF0000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '2']]],

                    ['rect', {'attrs': {'x': '93', 'y': '250', 'width': '20', 'height': '20', 'fill': '#ff0000', 'stroke': '#000000', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe flex-start; width: 	48px; height: 1px; padding-top: 260px; margin-left: 125px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: left; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Line ID']]]],
                            ['text', {'attrs': {'x': '125', 'y': '264', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px'}}, 'Line ID']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 115px; margin-left: 234px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '0']]]],
                            ['text', {'attrs': {'x': '253', 'y': '119', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '0']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 115px; margin-left: 434px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '1']]]],
                            ['text', {'attrs': {'x': '453', 'y': '119', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '1']]],

                    ['path', {'attrs': {'d': 'M 493 60 L 505 60', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //switch2
                    ['path', {'attrs': {'d': `M 505 60 L 517 ${switchArray[2]["value"] == 0 ? 50 : 59}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(2)}}],

                    ['path', {'attrs': {'d': 'M 533 60 L 517 60', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 40px; margin-left: 494px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '2']]]],
                            ['text', {'attrs': {'x': '513', 'y': '44', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '2']]],

                    ['path', {'attrs': {'d': 'M 613 60 L 625 60', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //switch3
                    ['path', {'attrs': {'d': `M 625 60 L 637 ${switchArray[3]["value"] == 0 ? 50 : 59}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(3)}}],

                    ['path', {'attrs': {'d': 'M 653 60 L 637 60', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 40px; margin-left: 614px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '3']]]],
                            ['text', {'attrs': {'x': '633', 'y': '44', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '3']]],

                    ['path', {'attrs': {'d': 'M 613 100 L 625 100', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //switch4
                    ['path', {'attrs': {'d': `M 625 100 L 637 ${switchArray[4]["value"] == 0 ? 90 : 99}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(4)}}],

                    ['path', {'attrs': {'d': 'M 653 100 L 637 100', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 80px; margin-left: 614px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '4']]]],
                            ['text', {'attrs': {'x': '633', 'y': '84', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '4']]],

                    ['path', {'attrs': {'d': 'M 613 180 L 625 180', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //switch5
                    ['path', {'attrs': {'d': `M 625 180 L 637 ${switchArray[5]["value"] == 0 ? 170 : 179}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(5)}}],

                    ['path', {'attrs': {'d': 'M 653 180 L 637 180', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 160px; margin-left: 614px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '5']]]],
                            ['text', {'attrs': {'x': '633', 'y': '164', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '5']]],

                    ['path', {'attrs': {'d': 'M 613 220 L 625 220', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //switch6
                    ['path', {'attrs': {'d': `M 625 220 L 637 ${switchArray[6]["value"] == 0 ? 210 : 219}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(6)}}],

                    ['path', {'attrs': {'d': 'M 653 220 L 637 220', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 200px; margin-left: 614px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '6']]]],
                            ['text', {'attrs': {'x': '633', 'y': '204', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '6']]],

                    ['path', {'attrs': {'d': 'M 493 220 L 505 220', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],
                    //switch7
                    ['path', {'attrs': {'d': `M 505 220 L 517 ${switchArray[7]["value"] == 0 ? 210 : 219}`, 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10'}, on : { click: () => changeState(7)}}],

                    ['path', {'attrs': {'d': 'M 533 220 L 517 220', 'fill': 'none', 'stroke': '#000000', 'stroke-miterlimit': '10', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 200px; margin-left: 494px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #006600; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, '7']]]],
                            ['text', {'attrs': {'x': '513', 'y': '204', 'fill': '#006600', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, '7']]],

                    ['rect', {'attrs': {'x': '93', 'y': '280', 'width': '20', 'height': '20', 'fill': '#006600', 'stroke': '#000000', 'pointer-events': 'none'}}],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe flex-start; width: 	78px; height: 1px; padding-top: 290px; margin-left: 125px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: left; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Switch ID']]]],
                            ['text', {'attrs': {'x': '125', 'y': '294', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px'}}, 'Switch ID']]],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 190px; margin-left: 74px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Bus']]]],
                            ['text', {'attrs': {'x': '93', 'y': '194', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Bus']]],

                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 150px; margin-left: 134px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Line']]]],
                            ['text', {'attrs': {'x': '153', 'y': '154', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Line']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 150px; margin-left: 234px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Switch']]]],
                            ['text', {'attrs': {'x': '253', 'y': '154', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Switch']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 110px; margin-left: 334px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Trafo']]]],
                            ['text', {'attrs': {'x': '353', 'y': '114', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Trafo']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 235px; margin-left: 344px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Shunt']]]],
                            ['text', {'attrs': {'x': '363', 'y': '239', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Shunt']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 270px; margin-left: 364px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Ground']]]],
                            ['text', {'attrs': {'x': '383', 'y': '274', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Ground']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 58px; 	height: 1px; padding-top: 80px; margin-left: 714px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Generator']]]],
                            ['text', {'attrs': {'x': '743', 'y': '84', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Generator']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 220px; margin-left: 714px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'Load']]]],
                            ['text', {'attrs': {'x': '733', 'y': '224', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Load']]],
                    ['g', {'attrs': {'transform': 'translate(-0.5 -0.5)'}},
                        ['switch',
                            ['foreignObject', {'attrs': {'style': 'overflow: visible; text-align: left;', 'pointer-events': 'none', 'width': '100%', 'height': '100%', 	'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}},
                                ['div', {'attrs': {'style': 'display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; 	height: 1px; padding-top: 160px; margin-left: 4px;'}},
                                    ['div', {'attrs': {'style': 'box-sizing: border-box; font-size: 0; text-align: center; '}},
                                        ['div', {'attrs': {'style': 'display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: none; 	white-space: normal; word-wrap: normal; '}}, 'External grid']]]],
                            ['text', {'attrs': {'x': '23', 'y': '164', 'fill': '#000000', 'font-family': 'Helvetica', 'font-size': '12px', 'text-anchor': 'middle'}}, 'Extern...']]],
                    ['switch',
                        ['g', {'attrs': {'requiredFeatures': 'http://www.w3.org/TR/SVG11/feature#Extensibility'}}],
                        ['a', {'attrs': {'transform': 'translate(0,-5)', 'href': 'https://www.diagrams.net/doc/faq/svg-export-text-problems', 'target': '_blank'}},
                            ['text', {'attrs': {'text-anchor': 'middle', 'font-size': '10px', 'x': '50%', 'y': '100%'}}, 'Viewer does not support full SVG 1.1']]]]]
        ];
}
