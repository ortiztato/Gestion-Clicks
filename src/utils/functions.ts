import { DataClicks } from "types/global"

export const filterCantidadesSubTipo = (array: DataClicks[], tipo: string, subTipo: string) => {
    const arrayToFilter = array

    const arraySubTipoCantidad: any = []


    for (let i = 0; i < arrayToFilter.length; i++) {
        if (arrayToFilter[i].tipo === tipo && arrayToFilter[i].subTipo === subTipo) {
					arraySubTipoCantidad.push(arrayToFilter[i])
        }
    }
    //  console.log(`arraySubTipoCantidad`, arraySubTipoCantidad)
    return arraySubTipoCantidad.length
}

export const filterCantidadesTipo = (array: DataClicks[], tipo: string) => {
    const arrayToFilter = array

    const arrayTipo: any = []

    for (let i = 0; i < arrayToFilter.length; i++) {
        if (arrayToFilter[i].tipo === tipo) {
            arrayTipo.push(arrayToFilter[i])
        }
    }
    //  console.log(`arrayTipo`, arrayTipo)
    return arrayTipo.length
}