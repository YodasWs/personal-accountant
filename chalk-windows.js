/**
 * Fixing the colors on my Windows Bash Shell
 */

// Reverse black and white on Windows
if (isSimpleWindowsTerm) {
	ansiStyles.black.open = '\u001b[37m';
	ansiStyles.white.open = '\u001b[30m';
	if (ansiStyles.colors) {
		ansiStyles.colors.black[0] = 37;
		ansiStyles.colors.white[0] = 30;
	}
	if (ansiStyles.bgColors) {
		ansiStyles.bgBlack.open = '\u001b[47m';
		ansiStyles.bgWhite.open = '\u001b[40m';
		ansiStyles.bgColors.bgBlack[0] = 47;
		ansiStyles.bgColors.bgWhite[0] = 40;
	}
}

// Fix bold
if (isSimpleWindowsTerm) {
	ansiStyles.bold.close = '\u001b[0m';
	if (ansiStyles.modifiers) {
		ansiStyles.modifiers.bold[1] = 0;
	}
}
