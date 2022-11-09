export interface DataClicks {
    _id: string
    tipo: string,
    subTipo: string
    createdAt: string
}

export interface DataSubtipo {
	tipo: string
	subTipo: string
}

export interface DataFinal {
	tipo: string
	subTipo?: string
	cantidad: number
}