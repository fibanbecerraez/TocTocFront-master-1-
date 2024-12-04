type ColorPalette = {
    [key: string]: string;
};

class ColorManager {
    private static colors: ColorPalette = {
        accentMain: '#F2994A',
        accentBlue: '#2B59C3',
        main: '#E3C5A8',
        white: '#F3F3F3',
        black: '#000000',
        lightBlue: '#81C7D4',
        lightBg: '#EEE8DE',
        buttonMain: '#CEBB9B',
        red: '#CC0000',
        green: '#4BB543',
        placeholderGray: '#6C6C6C',
        clear: "#00000000"
    };

    static setColor(name: string, hexCode: string) {
        this.colors[name] = hexCode;
    }

    // Método para obtener un color por su nombre
    static getColor(name: string): string {
        return this.colors[name] || '#000000';
    }
}

export default ColorManager;
