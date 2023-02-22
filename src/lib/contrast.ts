import { Colord, colord } from 'colord'

export function contrast(color: Colord): Colord {
	return color.isLight() ? colord('#000') : colord('#fff')
}
