import 'main/index.scss';


export function vt() {
    //return ['span', `bus: ${r.get('remote', 'adapter', 'bus')}`];
    return ['div', 
            ['div.class1',`bus: ${r.get('remote', 'adapter', 'bus')}`],
            ['div.class2',`line: ${r.get('remote', 'adapter', 'line')}`],
            ['div.class3',`transformer:  ${r.get('remote', 'adapter', 'transformer')}`],
            ['div.class4',`switch: ${r.get('remote', 'adapter', 'switch')}`],];

}
