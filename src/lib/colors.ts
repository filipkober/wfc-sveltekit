export const shortRgbToLong = (color: string): string => {
    // Extract the hexadecimal values for red, green, and blue
    const redHex = color.slice(1, 3);
    const greenHex = color.slice(3, 5);
    const blueHex = color.slice(5, 7);

    // Convert the hexadecimal values to decimal
    const red = parseInt(redHex, 16);
    const green = parseInt(greenHex, 16);
    const blue = parseInt(blueHex, 16);

    // Construct the RGB string
    return `rgb(${red} ${green} ${blue})`;
};
