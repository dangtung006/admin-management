module.exports = {
    convertToFt: (value, unit) => {
        switch (unit) {
            case 'm':
                return 3.2808 * value;
            case 'cm':
                return 0.03281 * value;
            case 'mm':
                return 0.00328 * value;
            case 'in':
                return 0.0833 * value;
            default:
                return value;
        }
    },

    convertToSqf: (value, unit) => {
        value = value ? parseFloat(value) : 0
        switch (unit) {
            case 'm':
                return 10.7639 * value;
            case 'cm':
                return 0.00107639 * value;
            case 'mm':
                return 0.00107639 * 0.00107639 * value;
            case 'in':
                return 0.00694444 * value;
            default:
                return value;
        }
    },

    calculatorArea: (width, height, length, input_type) => {
        switch (input_type) {
            case 'WxH':
                return width * height;
                break;
            case 'WxL':
                return width * length;
                break;
            case 'HxL':
                return length * height;
                break;
            case 'W':
                return width;
                break;
            case 'H':
                return height;
                break;
            case 'L':
                return length;
                break;
            default:
                return width * height;
                break;
        }
    },

    calculatorAreaNew: (width, height, length, floor_area, input_type) => {
        let floor = floor_area || width * length;
        switch (input_type) {
            case 'WxH':
                return floor || width * height;
                break;
            case 'WxL':
                return floor;
                break;
            case 'HxL':
                return floor || length * height;
                break;
            case 'Wx2+Lx2':
                return (length + width) * 2;
                break;
            case 'Wx2xH+Lx2xH':
                return (length + width) * height * 2;
                break;
            case 'Wx1.2 x Lx1.2':
                return (floor) * 1.2 * 1.2;
                break;
            case 'Wx2xHx1.2 + Lx2xHx1.2':
                return (length + width) * height * 2 * 1.2;
                break;
            case 'W':
                return floor || width;
                break;
            case 'H':
                return height;
                break;
            case 'L':
                return floor || length;
                break;
            default:
                return floor || width * height;
                break;
        }
    },

    calculatorAreaV2: (width, height, length, input_type, floor_area = 0) => {
        width = parseFloat(width).toFixed(2)
        height = parseFloat(height).toFixed(2)
        length = parseFloat(length).toFixed(2)

        switch (input_type) {
            case 'WxH':
                return `WxH - ${width}x${height} sqf`;
                break;
            case 'WxL':
                return `WxL - ${width}x${length} sqf`;
                break;
            case 'HxL':
                return `HxL - ${height}x${length} sqf`;
                break;
            case 'Wx2+Lx2':
                return `Wx2+Lx2 - ${width}x2+${length}x2 sqf`;
                break;
            case 'Wx2xH+Lx2xH':
                return `Wx2xH+Lx2xH - ${width}x2x${height}+${length}x2x${height} sqf`;
                break;
            case 'Wx1.2 x Lx1.2':
                return `Wx1.2 x Lx1.2 - ${width}x1.2 x ${length}x1.2 sqf`;
                break;
            case 'Wx2xHx1.2 + Lx2xHx1.2':
                return `Wx2xHx1.2 + Lx2xHx1.2 - ${width}x2x${height}x1.2 + ${length}x2x${height}x1.2 sqf`;
                break;
            case 'W':
                return width;
                return `W - ${width} ft`;
                break;
            case 'H':
                return height;
                return `H - ${height} ft`;
                break;
            case 'L':
                return length;
                return `L - ${length} ft`;
                break;
            default:
                return `WxH - ${width}x${height} sqf`;
                break;
        }
    },
}